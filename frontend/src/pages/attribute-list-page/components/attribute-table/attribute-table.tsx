import './attribute-table.scss';
import { Button, Container, Table } from 'react-bootstrap';
import { AttributeListModel } from '../../../../shared/model/attribute-list.model';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { routes } from '../../../../shared/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SortColumnsEnum } from '../../../../shared/enum/sort-columns.enum';
import { SortDirectionEnum } from '../../../../shared/enum/sort-direction.enum';
import {
  faArrowDown,
  faArrowsUpDown,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';

type AttributeTableProps = {
  attributesPaginated: AttributeListModel[];
  canCallNextAttributes: boolean;
  onNextAttributesCallCallback: () => void;
  onAttributeDeleteCallback: (id: string) => void;
  onSortedByChangedCallback: (column: SortColumnsEnum) => void;
};

const AttributeTable = ({
  attributesPaginated,
  canCallNextAttributes,
  onNextAttributesCallCallback,
  onAttributeDeleteCallback,
  onSortedByChangedCallback,
}: AttributeTableProps) => {
  const tableRef = useRef<HTMLDivElement>(null);

  const isTableBottomAboveWindowBottomBorder = (tableRef: HTMLDivElement) => {
    const rect = tableRef.getBoundingClientRect();
    return window.innerHeight > rect.y + rect.height;
  };

  // initial loading of attributes, until they fill whole page height
  useEffect(() => {
    if (
      attributesPaginated.length > 0 &&
      canCallNextAttributes &&
      tableRef.current
    ) {
      isTableBottomAboveWindowBottomBorder(tableRef.current) &&
        canCallNextAttributes &&
        onNextAttributesCallCallback();
    }
  }, [attributesPaginated]);

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        isTableBottomAboveWindowBottomBorder(tableRef.current) &&
          canCallNextAttributes &&
          onNextAttributesCallCallback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onNextAttributesCallCallback]);

  return (
    <Container ref={tableRef}>
      <Table striped bordered hover size='sm' className='align-middle'>
        <thead className='align-middle'>
          <tr>
            <th>#</th>
            <th className='w-25'>
              Name
              <Button
                size='sm'
                className='m-1'
                onClick={() => onSortedByChangedCallback(SortColumnsEnum.NAME)}
              >
                {attributesPaginated.length > 0 &&
                attributesPaginated[attributesPaginated.length - 1].meta
                  .sortBy === SortColumnsEnum.NAME ? (
                  <>
                    {attributesPaginated[attributesPaginated.length - 1].meta
                      .sortDir === SortDirectionEnum.ASC ? (
                      <FontAwesomeIcon icon={faArrowDown} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowUp} />
                    )}
                  </>
                ) : (
                  <FontAwesomeIcon icon={faArrowsUpDown} />
                )}
              </Button>
            </th>
            <th className='w-50'>Labels</th>
            <th>
              Created at
              <Button
                size='sm'
                className='m-1'
                onClick={() =>
                  onSortedByChangedCallback(SortColumnsEnum.CREATED_AT)
                }
              >
                {attributesPaginated.length > 0 &&
                attributesPaginated[attributesPaginated.length - 1].meta
                  .sortBy === SortColumnsEnum.CREATED_AT ? (
                  <>
                    {attributesPaginated[attributesPaginated.length - 1].meta
                      .sortDir === SortDirectionEnum.ASC ? (
                      <FontAwesomeIcon icon={faArrowDown} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowUp} />
                    )}
                  </>
                ) : (
                  <FontAwesomeIcon icon={faArrowsUpDown} />
                )}
              </Button>
            </th>
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
                    {attribute.labels.length > 0 &&
                      attribute.labels.map((label) => label.name).join(', ')}
                  </td>
                  <td>{new Date(attribute.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant='danger'
                      onClick={() => onAttributeDeleteCallback(attribute.id)}
                    >
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
