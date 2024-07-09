import './attribute-list.scss';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { fetchAttributes, fetchLabels } from '../../shared/requests';
import AttributeTable from './components/attribute-table/attribute-table';
import {
  AttributeListModel,
  LabelModel,
} from '../../shared/model/attribute-list.model';
import { AttributeMapper } from '../../shared/mapper/attribute.mapper';
import AttributeSearch from './components/attribute-search/attribute-search';

const AttributeList = () => {
  const [labels, setLabels] = useState<LabelModel[]>([]);
  const [attributesPaginated, setAttributesPaginated] = useState<
    AttributeListModel[]
  >([]);
  const [attributesOffset, setAttributesOffset] = useState<number>(0);
  const [attributesSearchQuery, setAttributesSearchQuery] = useState<
    string | undefined
  >(undefined);

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
          AttributeMapper.convertTOToModel(attributes, labels),
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
        setAttributesPaginated((prev) => [
          AttributeMapper.convertTOToModel(attributes, labels),
        ]),
      );
    }
  }, [labels, attributesSearchQuery]);

  return (
    <Container>
      <h1>Attribute list</h1>
      <AttributeSearch onSearchCallback={handleSearchQueryChanges} />
      {attributesPaginated && (
        <AttributeTable
          attributesPaginated={attributesPaginated}
          canCallNextAttributes={
            attributesPaginated.length > 0
              ? attributesPaginated[attributesPaginated.length - 1].meta
                  .hasNextPage
              : true
          }
          nextAttributesCallCallback={handleNextAttributesCall}
        />
      )}
    </Container>
  );
};

export default AttributeList;
