import './attribute-table.scss';
import { Button, Container, Table } from 'react-bootstrap';
import { AttributeListModel } from '../../../../shared/model/attribute-list.model';

type AttributeTableProps = {
  attributes: AttributeListModel;
  nextAttributesCallCallback: () => void;
};

const AttributeTable = ({
  attributes,
  nextAttributesCallCallback,
}: AttributeTableProps) => {
  return (
    <Container>
      <Button onClick={nextAttributesCallCallback}>call</Button>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Labels</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {attributes &&
            attributes.data.map((attribute, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{attribute.name}</td>
                <td>
                  {attribute.labels &&
                    attribute.labels.map((label) => label.name).join(',')}
                </td>
                <td>{new Date(attribute.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AttributeTable;
