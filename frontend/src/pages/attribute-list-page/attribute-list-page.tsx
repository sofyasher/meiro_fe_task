import './attribute-list-page.scss';
import { Container } from 'react-bootstrap';
import AttributeList from './components/attributes-list/attribute-list';
import AttributeSearch from './components/attribute-search/attribute-search';
import { useCallback, useEffect, useState } from 'react';
import { AttributesService } from '../../shared/services/attributes.service';
import { LabelModel } from '../../shared/model/label.model';
import { usePrevious } from '../../shared/hooks/use-previous.hook';
import { AttributeListModel } from '../../shared/model/attribute-list.model';
import { LocalStorageService } from '../../shared/services/local-storage.service';

const AttributeListPage = () => {
  const initialQuery = LocalStorageService.getSearchQuery() ?? undefined;

  const [labels, setLabels] = useState<LabelModel[]>([]);
  const [attributesPaginated, setAttributesPaginated] = useState<
    AttributeListModel[]
  >([]);

  const [attributesSearchQuery, setAttributesSearchQuery] = useState<
    string | undefined
  >(initialQuery);

  const [attributesOffset, setAttributesOffset] = useState<number>(0);
  const prevOffset = usePrevious<number>(attributesOffset);

  const [refresh, setRefresh] = useState<number>(0);

  const handleSearchQueryChanges = useCallback((searchQuery: string): void => {
    setAttributesSearchQuery(searchQuery);
    LocalStorageService.setSearchQuery(searchQuery);
  }, []);

  const handleNextAttributesCall = (): void => {
    setAttributesOffset((prev) =>
      attributesPaginated.length > 0 ? prev + 1 : 0,
    );
  };

  const handleOnDelete = (id: string): void => {
    if (window.confirm('Are you sure you want to delete this attribute?')) {
      AttributesService.deleteAttribute(id)
        .then(() => setRefresh((prev) => prev + 1))
        .catch(() => alert('Failed to delete attribute'));
    }
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
      <AttributeSearch
        initialValue={initialQuery}
        onSearchCallback={handleSearchQueryChanges}
      />
      <AttributeList
        attributesPaginated={attributesPaginated}
        handleNextAttributesCall={handleNextAttributesCall}
        handleOnDelete={handleOnDelete}
      />
    </Container>
  );
};

export default AttributeListPage;
