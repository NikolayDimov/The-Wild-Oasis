import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { CabinType } from "../../services/apiCabins";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

// v1
const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    /* transform: scale(1.66666) translateX(-2px); */
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

interface CabinRowProps {
    cabin: CabinType;
}

const CabinRow: React.FC<CabinRowProps> = ({ cabin }) => {
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { createCabin } = useCreateCabin();
    const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;

    // console.log("Image:", image);

    function handleDuplicate() {
        // const newImage = typeof image === "string" ? image : image[0];
        createCabin({ newCabinData: { name: `Copy of ${name}`, maxCapacity, regularPrice, discount, description, image } });
    }

    return (
        <TableRow role="row">
            {/* <Img src={image} alt={`Cabin ${name}`} /> */}
            <Img src={typeof image === "string" ? image : Array.isArray(image) ? image[0] : undefined} alt={`Cabin ${name}`} />

            <Cabin>{name}</Cabin>

            <div>Fits up to {maxCapacity} guests</div>

            <Price>{formatCurrency(regularPrice)}</Price>

            {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

            <div>
                <button onClick={handleDuplicate}>
                    <HiSquare2Stack />
                </button>
                <Modal>
                    <Modal.Open opens="cabin-edit">
                        <button>
                            <HiPencil />
                        </button>
                    </Modal.Open>
                    <Modal.Window name="cabin-edit">
                        <CreateCabinForm cabinToEdit={cabin} />
                    </Modal.Window>

                    <Modal.Open opens="cabin-delete">
                        <button>
                            <HiTrash />
                        </button>
                    </Modal.Open>
                    <Modal.Window name="cabin-delete">
                        <ConfirmDelete resource="cabins" disabled={isDeleting} onConfirm={() => deleteCabin(cabinId || "")} />
                    </Modal.Window>
                </Modal>
            </div>
        </TableRow>
    );
};

export default CabinRow;
