import './attribute-table.scss';
import { Button, Container, Table } from 'react-bootstrap';
import { AttributeListModel } from '../../../../shared/model/attribute-list.model';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { routes } from '../../../../shared/routes';

type AttributeTableProps = {
  attributesPaginated: AttributeListModel[];
  canCallNextAttributes: boolean;
  nextAttributesCallCallback: () => void;
  onDeleteCallback: (id: string) => void;
};

const AttributeTable = ({
  attributesPaginated,
  canCallNextAttributes,
  nextAttributesCallCallback,
  onDeleteCallback,
}: AttributeTableProps) => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        canCallNextAttributes && nextAttributesCallCallback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextAttributesCallCallback]);

  return (
    <Container>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Labels</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attributesPaginated.map((attributes, index1) => {
            return attributes.data.map((attribute, index2) => {
              return (
                <tr key={attribute.id}>
                  <td>{index1 * attributes.meta.limit + (index2 + 1)}</td>
                  <td>
                    <Link to={`${routes.attributes}/${attribute.id}`}>
                      {attribute.name}
                    </Link>
                  </td>
                  <td>
                    {attribute.labels &&
                      attribute.labels.map((label) => label.name).join(', ')}
                  </td>
                  <td>{new Date(attribute.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button onClick={() => onDeleteCallback(attribute.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default AttributeTable;
