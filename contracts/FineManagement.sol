// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FineManagement is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _fineIds;

    enum FineState { PENDING, PAID, APPEALED, RESOLVED_APPEAL, CANCELLED }

    struct Fine {
        uint256 id;
        string plateNumber; // Número de placa
        string evidenceCID; // CID de IPFS de la evidencia
        string location; // Ubicación de la infracción
        uint256 timestamp; // Marca de tiempo (Unix timestamp)
        string infractionType; // Tipo de infracción
        uint256 cost; // Costo de la multa
        string ownerIdentifier; // Identificador del propietario (DNI, RUC, etc.)
        FineState currentState; // Estado actual de la multa
        address registeredBy; // Dirección que registró la multa
        string externalSystemId; // ID externo (opcional, por ejemplo, de SIMIT)
    }

    struct FineStatusUpdate {
        uint256 timestamp; // Marca de tiempo de la actualización
        FineState oldState; // Estado anterior
        FineState newState; // Nuevo estado
        string reason; // Razón del cambio de estado
        address updatedBy; // Dirección que realizó la actualización
    }

    mapping(uint256 => Fine) public fines; // ID de multa => detalles de la multa
    mapping(uint256 => FineStatusUpdate[]) public fineStatusHistory; // ID de multa => historial de estados
    mapping(string => uint256[]) public finesByPlate; // Número de placa => IDs de multas
    mapping(string => uint256[]) public finesByOwner; // Identificador del propietario => IDs de multas

    event FineRegistered(
        uint256 indexed fineId,
        string indexed plateNumber,
        string evidenceCID,
        string ownerIdentifier,
        uint256 cost,
        uint256 timestamp
    );

    event FineStatusUpdated(
        uint256 indexed fineId,
        FineState indexed oldState,
        FineState indexed newState,
        string reason,
        uint256 timestamp
    );

    mapping(address => bool) public operators;

    modifier onlyOperator() {
        require(operators[msg.sender] || owner() == msg.sender, "Not an operator");
        _;
    }

    constructor() {
        operators[msg.sender] = true; // El deployer es un operador por defecto
    }

    /**
     * Agrega un operador autorizado.
     */
    function addOperator(address _operator) public onlyOwner {
        operators[_operator] = true;
    }

    /**
     * Elimina un operador autorizado.
     */
    function removeOperator(address _operator) public onlyOwner {
        operators[_operator] = false;
    }

    /**
     * Registra una nueva multa.
     */
    function registerFine(
        string memory _plateNumber,
        string memory _evidenceCID,
        string memory _location,
        string memory _infractionType,
        uint256 _cost,
        string memory _ownerIdentifier,
        string memory _externalSystemId // Opcional
    ) public onlyOperator returns (uint256) {
        require(bytes(_plateNumber).length > 0, "Plate number is required");
        require(bytes(_evidenceCID).length > 0, "Evidence CID is required");
        require(bytes(_location).length > 0, "Location is required");
        require(bytes(_infractionType).length > 0, "Infraction type is required");
        require(_cost > 0, "Cost must be greater than zero");

        _fineIds.increment();
        uint256 newFineId = _fineIds.current();

        fines[newFineId] = Fine({
            id: newFineId,
            plateNumber: _plateNumber,
            evidenceCID: _evidenceCID,
            location: _location,
            timestamp: block.timestamp,
            infractionType: _infractionType,
            cost: _cost,
            ownerIdentifier: _ownerIdentifier,
            currentState: FineState.PENDING,
            registeredBy: msg.sender,
            externalSystemId: _externalSystemId
        });

        finesByPlate[_plateNumber].push(newFineId);
        finesByOwner[_ownerIdentifier].push(newFineId);

        emit FineRegistered(
            newFineId,
            _plateNumber,
            _evidenceCID,
            _ownerIdentifier,
            _cost,
            block.timestamp
        );

        return newFineId;
    }

    /**
     * Actualiza el estado de una multa.
     */
    function updateFineStatus(
        uint256 _fineId,
        FineState _newState,
        string memory _reason
    ) public onlyOperator {
        Fine storage fine = fines[_fineId];
        require(fine.id != 0, "Fine does not exist");
        require(fine.currentState != _newState, "State is already the same");

        FineState oldState = fine.currentState;
        fine.currentState = _newState;

        fineStatusHistory[_fineId].push(FineStatusUpdate({
            timestamp: block.timestamp,
            oldState: oldState,
            newState: _newState,
            reason: _reason,
            updatedBy: msg.sender
        }));

        emit FineStatusUpdated(_fineId, oldState, _newState, _reason, block.timestamp);
    }

    /**
     * Obtiene los detalles de una multa.
     */
    function getFineDetails(uint256 _fineId) public view returns (Fine memory) {
        require(fines[_fineId].id != 0, "Fine does not exist");
        return fines[_fineId];
    }

    /**
     * Obtiene los IDs de multas asociadas a un número de placa.
     */
    function getFinesByPlate(string memory _plateNumber) public view returns (uint256[] memory) {
        return finesByPlate[_plateNumber];
    }

    /**
     * Obtiene el número total de multas registradas.
     */
    function getAllFineCount() public view returns (uint256) {
        return _fineIds.current();
    }

    /**
     * Obtiene multas paginadas.
     */
    function getPaginatedFines(uint256 _page, uint256 _pageSize) public view returns (Fine[] memory) {
        require(_pageSize > 0, "Page size must be greater than zero");

        uint256 totalFines = _fineIds.current();
        uint256 startIndex = (_page - 1) * _pageSize;
        uint256 endIndex = startIndex + _pageSize;

        if (startIndex >= totalFines) {
            return new Fine[](0);
        }

        if (endIndex > totalFines) {
            endIndex = totalFines;
        }

        Fine[] memory paginatedFines = new Fine[](endIndex - startIndex);
        for (uint256 i = startIndex; i < endIndex; i++) {
            paginatedFines[i - startIndex] = fines[i + 1];
        }

        return paginatedFines;
    }
}