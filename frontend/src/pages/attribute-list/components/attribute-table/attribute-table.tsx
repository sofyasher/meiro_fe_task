import './attribute-table.scss';
import { Container, Table } from 'react-bootstrap';
import { AttributeListModel } from '../../../../shared/model/attribute-list.model';

type AttributeTableProps = {
  attributes: AttributeListModel;
};

const AttributeTable = ({ attributes }: AttributeTableProps) => {
  return (
    <Container>
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
