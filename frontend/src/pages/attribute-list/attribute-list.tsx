import './attribute-list.scss';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {
  deleteAttribute,
  fetchAttributes,
  fetchLabels,
} from '../../shared/requests';
import AttributeTable from './components/attribute-table/attribute-table';
import { AttributeListModel } from '../../shared/model/attribute-list.model';
import { AttributeListMapper } from '../../shared/mapper/attribute-list.mapper';
import AttributeSearch from './components/attribute-search/attribute-search';
import { LabelModel } from '../../shared/model/label.model';

const AttributeList = () => {
  const [labels, setLabels] = useState<LabelModel[]>([]);
  const [attributesPaginated, setAttributesPaginated] = useState<
    AttributeListModel[]
  >([]);
  const [attributesOffset, setAttributesOffset] = useState<number>(0);
  const [attributesSearchQuery, setAttributesSearchQuery] = useState<
    string | undefined
  >(undefined);
  const [refresh, setRefresh] = useState<number>(0);

  const handleNextAttributesCall = (): void => {
    setAttributesOffset(
      attributesPaginated.length > 0
        ? attributesPaginated[attributesPaginated.length - 1].meta.offset + 1
        : 0,
    );
  };

  const handleSearchQueryChanges = (searchQuery: string): void => {
    setAttributesSearchQuery(searchQuery);
  };

  const handleOnDelete = (id: string): void => {
    deleteAttribute(id).then((response) => {
      if (response.ok) {
        setRefresh((prev) => prev + 1);
      }
    });
  };

  useEffect(() => {
    fetchLabels().then((labels) => setLabels(labels));
  }, []);

  useEffect(() => {
    if (labels.length > 0) {
      fetchAttributes({
        offset: attributesOffset,
      }).then((attributes) =>
        setAttributesPaginated((prev) => [
          ...prev,
          AttributeListMapper.convertTOToModel(attributes, labels),
        ]),
      );
    }
  }, [labels, attributesOffset]);

  useEffect(() => {
    if (labels.length > 0) {
      fetchAttributes({
        offset: 0,
        searchText: attributesSearchQuery,
      }).then((attributes) =>
        setAttributesPaginated([
          AttributeListMapper.convertTOToModel(attributes, labels),
        ]),
      );
    }
  }, [labels, attributesSearchQuery, refresh]);

  return (
    <Container className='top-80'>
      <h1>Attribute list</h1>
      <AttributeSearch onSearchCallback={handleSearchQueryChanges} />
      {attributesPaginated && (
        <div className='mt-4'>
          <AttributeTable
            attributesPaginated={attributesPaginated}
            canCallNextAttributes={
              attributesPaginated.length > 0
                ? attributesPaginated[attributesPaginated.length - 1].meta
                    .hasNextPage
                : true
            }
            nextAttributesCallCallback={handleNextAttributesCall}
            onDeleteCallback={(id) => handleOnDelete(id)}
          />
        </div>
      )}
    </Container>
  );
};

export default AttributeList;
