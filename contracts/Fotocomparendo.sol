// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol"; // Para control de acceso básico

contract Fotocomparendo is Ownable {
    // Estados posibles de una multa
    enum FineStatus {
        Pending,
        Paid,
        Appealed,
        Cancelled,
        SIMITVerified
    }

    // Estructura de datos para una multa
    struct Fine {
        uint256 id; // ID único en nuestro sistema
        string fineSIMITId; // ID externo del sistema SIMIT (si aplica)
        string plateNumber; // Número de placa del vehículo
        string ipfsEvidenceHash; // CID de la evidencia en IPFS
        string offenseType; // Tipo de infracción
        string location; // Ubicación de la infracción
        uint256 offenseTimestamp; // Marca de tiempo (Unix) de la infracción
        uint256 amount; // Monto de la multa
        FineStatus status; // Estado actual de la multa
        address registrar; // Dirección que registró la multa
        uint256 lastUpdated; // Última actualización (Unix timestamp)
    }

    uint256 public nextFineId; // Contador para IDs únicos de multas
    mapping(uint256 => Fine) public fines; // ID de multa => detalles de la multa
    mapping(string => uint256[]) public finesByPlate; // Número de placa => IDs de multas
    uint256[] public allFineIds; // Lista de todos los IDs de multas

    // Eventos
    event FineRegistered(
        uint256 indexed id,
        string plateNumber,
        string ipfsEvidenceHash,
        FineStatus status,
        address registrar
    );

    event FineStatusUpdated(
        uint256 indexed id,
        FineStatus oldStatus,
        FineStatus newStatus,
        string reason,
        address updatedBy
    );

    // Modificador para restringir acceso a funciones específicas
    modifier onlyAuthorized() {
        require(owner() == msg.sender, "Not authorized");
        _;
    }

    // Constructor: inicializa el contador de multas
    constructor() {
        nextFineId = 1;
    }

    /**
     * Asocia una multa con un ID externo del sistema SIMIT.
     * @param fineId ID de la multa en nuestro sistema.
     * @param simitId ID externo del sistema SIMIT.
     */
    function linkToSIMIT(
        uint256 fineId,
        string memory simitId
    ) public onlyAuthorized {
        Fine storage fine = fines[fineId];
        require(fine.id != 0, "Fine does not exist");
        require(bytes(simitId).length > 0, "SIMIT ID is required");

        fine.fineSIMITId = simitId;
        fine.lastUpdated = block.timestamp;
    }

    /**
     * Registra una nueva multa.
     * @param plateNumber Número de placa del vehículo.
     * @param ipfsEvidenceHash CID de la evidencia en IPFS.
     * @param offenseType Tipo de infracción.
     * @param location Ubicación de la infracción.
     * @param offenseTimestamp Marca de tiempo de la infracción.
     * @param amount Monto de la multa.
     * @return ID de la multa registrada.
     */
    function registerFine(
        string memory plateNumber,
        string memory ipfsEvidenceHash,
        string memory offenseType,
        string memory location,
        uint256 offenseTimestamp,
        uint256 amount
    ) public onlyAuthorized returns (uint256) {
        require(bytes(plateNumber).length > 0, "Plate number is required");
        require(
            bytes(ipfsEvidenceHash).length > 0,
            "Evidence hash is required"
        );
        require(amount > 0, "Amount must be greater than zero");

        uint256 fineId = nextFineId;
        fines[fineId] = Fine({
            id: fineId,
            fineSIMITId: "",
            plateNumber: plateNumber,
            ipfsEvidenceHash: ipfsEvidenceHash,
            offenseType: offenseType,
            location: location,
            offenseTimestamp: offenseTimestamp,
            amount: amount,
            status: FineStatus.Pending,
            registrar: msg.sender,
            lastUpdated: block.timestamp
        });

        finesByPlate[plateNumber].push(fineId);
        allFineIds.push(fineId);
        nextFineId++;

        emit FineRegistered(
            fineId,
            plateNumber,
            ipfsEvidenceHash,
            FineStatus.Pending,
            msg.sender
        );
        return fineId;
    }

    /**
     * Actualiza el estado de una multa.
     * @param fineId ID de la multa.
     * @param newStatus Nuevo estado de la multa.
     * @param reason Razón del cambio de estado.
     */
    function updateFineStatus(
        uint256 fineId,
        FineStatus newStatus,
        string memory reason
    ) public onlyAuthorized {
        Fine storage fine = fines[fineId];
        require(fine.id != 0, "Fine does not exist");
        require(fine.status != newStatus, "Status is already the same");

        FineStatus oldStatus = fine.status;
        fine.status = newStatus;
        fine.lastUpdated = block.timestamp;

        emit FineStatusUpdated(
            fineId,
            oldStatus,
            newStatus,
            reason,
            msg.sender
        );
    }

    /**
     * Obtiene los detalles de una multa.
     * @param fineId ID de la multa.
     * @return Detalles de la multa.
     */
    function getFineDetails(uint256 fineId) public view returns (Fine memory) {
        require(fines[fineId].id != 0, "Fine does not exist");
        return fines[fineId];
    }

    /**
     * Obtiene los IDs de multas asociadas a un número de placa.
     * @param plateNumber Número de placa.
     * @return Lista de IDs de multas.
     */
    function getFinesByPlate(
        string memory plateNumber
    ) public view returns (uint256[] memory) {
        return finesByPlate[plateNumber];
    }

    /**
     * Obtiene el número total de multas registradas.
     * @return Número total de multas.
     */
    function getAllFineCount() public view returns (uint256) {
        return allFineIds.length;
    }

    /**
     * Obtiene multas paginadas.
     * @param page Número de página (comenzando desde 1).
     * @param pageSize Tamaño de la página.
     * @return Lista de multas en la página solicitada.
     */
    function getPaginatedFines(
        uint256 page,
        uint256 pageSize
    ) public view returns (Fine[] memory) {
        require(page > 0 && pageSize > 0, "Invalid pagination parameters");

        uint256 start = (page - 1) * pageSize;
        uint256 end = start + pageSize;
        if (end > allFineIds.length) {
            end = allFineIds.length;
        }

        Fine[] memory paginatedFines = new Fine[](end - start);
        for (uint256 i = start; i < end; i++) {
            paginatedFines[i - start] = fines[allFineIds[i]];
        }

        return paginatedFines;
    }
}
