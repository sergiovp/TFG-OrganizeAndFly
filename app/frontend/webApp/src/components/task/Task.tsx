import { Card } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './styles.css';

const COMP_NAME = 'Task';

export default function Task() {
    return (
        <Card style={{ width: '18rem' }} className={`${COMP_NAME}__main-card`}>
            <Card.Body className={`${COMP_NAME}__body-card`}>
                <Card.Text className={`${COMP_NAME}__text-card`}>
                    <div className={`${COMP_NAME}__scroll-bar`}>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content. BLABLA BLABLA BLABLA BLBLABLA BLABLA BLABLA BLBLABLA BLABLA BLABLA BL
                        ABLA BLABLA BLABLA BLABLA BLABLA BLABLA BL BLABLA BLABLA BLABLA BL
                    </div> 
                </Card.Text>
                <IconButton href="/hola" className={`${COMP_NAME}__more-button`} aria-label="show task details" color="primary">
                    <AddCircleOutlineIcon />
                </IconButton>
            </Card.Body>
        </Card>
    );
}
