import {Button, ButtonToolbar, Modal} from 'rsuite';

export default function PhotoModal({open, photo, title, total, index, onClose, onNext, onPrev}) {
    return (
        <Modal open={open} onClose={onClose} size="lg">
            <Modal.Header>
                <Modal.Title>{title || 'Photo'} {typeof index === 'number' && total
                    ? `(${index + 1} / ${total})`
                    : null}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{display: 'flex', justifyContent: 'center'}}>
                {photo && (
                    <img
                    src={photo.url}
                    alt={title}
                    style={{maxWidth: '100%', maxHeight: '70vh', display: 'block'}}
                    />
                    )}
            </Modal.Body>
            <Modal.Footer>
                <ButtonToolbar>
                    <Button appearance="subtle" onClick={onPrev}>
                        Previous
                    </Button>
                    <Button appearance="primary" onClick={onNext}>
                        Next
                    </Button>
                    <Button appearance="subtle" onClick={onClose}>
                        Close
                    </Button>
                </ButtonToolbar>
            </Modal.Footer>
        </Modal>
    );
}