import './attribute-list.scss';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import AttributeTable from './components/attribute-table/attribute-table';
import { AttributeListModel } from '../../shared/model/attribute-list.model';
import AttributeSearch from './components/attribute-search/attribute-search';
import { LabelModel } from '../../shared/model/label.model';
import { AttributesService } from '../../shared/services/attributes.service';
import { usePrevious } from '../../shared/hooks/use-previous.hook';

const AttributeList = () => {
  const [labels, setLabels] = useState<LabelModel[]>([]);
  const [attributesPaginated, setAttributesPaginated] = useState<
    AttributeListModel[]
  >([]);

  const [attributesOffset, setAttributesOffset] = useState<number>(0);
  const prevOffset = usePrevious<number>(attributesOffset);

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
    AttributesService.deleteAttribute(id)
      .then((response) => {
        setRefresh((prev) => prev + 1);
      })
      .catch(() => alert('Failed to delete attribute'));
  };

  useEffect(() => {
    AttributesService.getAllLabelsAndFirstOffsetOfAttributes()
      .then(({ attributes, labels }) => {
        setAttributesPaginated([attributes]);
        setLabels(labels);
      })
      .catch(() => alert('Failed to load attributes'));
  }, []);

  useEffect(() => {
    if (labels.length > 0) {
      AttributesService.getNextAttributesAndSupplementByLabels(
        {
          // offset changed => we need to get next data,
          // offset didn't change <=> query changed or refresh emitted => we need to get data from offset 0
          offset: attributesOffset !== prevOffset ? attributesOffset : 0,
          searchText: attributesSearchQuery,
        },
        labels,
      )
        .then((attributes) =>
          setAttributesPaginated((prev) =>
            attributesOffset !== prevOffset
              ? [...prev, attributes]
              : [attributes],
          ),
        )
        .catch(() => alert('Failed to load attributes'));
    }
  }, [attributesOffset, attributesSearchQuery, refresh]);

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
