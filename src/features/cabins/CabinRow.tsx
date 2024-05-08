import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

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

interface CabinType {
    cabin: {
        id: string;
        name: string;
        maxCapacity: number;
        regularPrice: number;
        discount?: number;
        image: string;
        description: string;
    };
}

const CabinRow: React.FC<CabinType> = ({ cabin }) => {
    const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => deleteCabin(id),
        onSuccess: () => {
            toast.success("Cabin successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    const isDeleting = mutation.status === "pending";

    return (
        <TableRow role="row">
            <Img src={image} alt={`Cabin ${name}`} />

            <Cabin>{name}</Cabin>

            <div>Fits up to {maxCapacity} guests</div>

            <Price>{formatCurrency(regularPrice)}</Price>

            {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

            {/* <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={cabinId} />

                    <Menus.List id={cabinId}>
                        <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                            Duplicate
                        </Menus.Button>

                        <Modal.Toggle opens="edit">
                            <Menus.Button icon={<HiPencil />}>Edit cabin</Menus.Button>
                        </Modal.Toggle>

                       
                        <Modal.Toggle opens="delete">
                            <Menus.Button icon={<HiTrash />}>Delete cabin</Menus.Button>
                        </Modal.Toggle>
                    </Menus.List>
                </Menus.Menu>

            
                <Modal.Window name="edit">
                    <CreateCabinForm cabinToEdit={cabin} />
                </Modal.Window>

                <Modal.Window name="delete">
                    <ConfirmDelete resource="cabin" onConfirm={() => deleteCabin(cabinId)} disabled={isDeleting} />
                </Modal.Window>
            </Modal> */}

            {/* <div>
        <ButtonWithConfirm
          title='Delete cabin'
          description='Are you sure you want to delete this cabin? This action can NOT be undone.'
          confirmBtnLabel='Delete'
          onConfirm={() => deleteCabin(cabinId)}
          disabled={isDeleting}
        >
          Delete
        </ButtonWithConfirm>
        

        <Link to={`/cabins/${cabinId}`}>Details &rarr;</Link>
      </div> */}
            <button onClick={() => mutation.mutate(cabinId)} disabled={isDeleting}>
                Delete
            </button>
        </TableRow>
    );
};

export default CabinRow;
