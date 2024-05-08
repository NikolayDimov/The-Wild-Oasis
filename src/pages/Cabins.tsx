import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm((prevShowForm) => !prevShowForm);
    };

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>Filter / Sort</p>
            </Row>

            <Row>
                <CabinTable />
                <Button onClick={toggleForm}>Add new cabin</Button>
                {showForm && <CreateCabinForm />}
            </Row>
        </>
    );
}

export default Cabins;
