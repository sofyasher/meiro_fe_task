import './attribute-list-page.scss';
import { Container } from 'react-bootstrap';
import AttributeList from './components/attributes-list/attribute-list';
import AttributeSearch from './components/attribute-search/attribute-search';
import { useCallback, useEffect, useState } from 'react';
import { AttributesService } from '../../shared/services/attributes.service';
import { LabelModel } from '../../shared/model/label.model';
import { AttributeListModel } from '../../shared/model/attribute-list.model';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { SortDirectionEnum } from '../../shared/enum/sort-direction.enum';
import { SortColumnsEnum } from '../../shared/enum/sort-columns.enum';

interface Filters {
  offset: number;
  searchText: string | null;
  sortBy: SortColumnsEnum | null;
  sortDir: SortDirectionEnum | null;
}

const AttributeListPage = () => {
  const initialFilters: Filters = {
    offset: 0,
    searchText: LocalStorageService.getSearchText() ?? null,
    sortBy: null,
    sortDir: null,
  };

  const [labels, setLabels] = useState<LabelModel[]>([]);
  const [attributesPaginated, setAttributesPaginated] = useState<
    AttributeListModel[]
  >([]);

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [refresh, setRefresh] = useState<number>(0);

  const handleSearchTextChanges = useCallback((searchText: string): void => {
    if (searchText === '') {
      setFilters((prev) => ({ ...prev, offset: 0, searchText: null }));
      LocalStorageService.removeSearchText();
    } else {
      setFilters((prev) => ({ ...prev, offset: 0, searchText }));
      LocalStorageService.setSearchText(searchText);
    }
  }, []);

  const handleNextAttributesCall = (): void => {
    setFilters((prev) => ({
      ...prev,
      offset: attributesPaginated.length > 0 ? prev.offset + 1 : 0,
    }));
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
          offset: filters.offset,
          searchText: filters.searchText ?? undefined,
        },
        labels,
      )
        .then((attributes) =>
          setAttributesPaginated((prev) =>
            filters.offset === 0 ? [attributes] : [...prev, attributes],
          ),
        )
        .catch(() => alert('Failed to load attributes'));
    }
  }, [filters, refresh]);

  return (
    <Container className='top-80'>
      <h1>Attribute list</h1>
      <AttributeSearch
        initialValue={initialFilters.searchText ?? undefined}
        onSearchCallback={handleSearchTextChanges}
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
