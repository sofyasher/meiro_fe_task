import './attribute-list-page.scss';
import { Container } from 'react-bootstrap';
import AttributeList from './components/attributes-list/attribute-list';
import AttributeSearch from './components/attribute-search/attribute-search';
import { useEffect, useState } from 'react';
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
    sortBy: LocalStorageService.getSortBy() ?? null,
    sortDir: LocalStorageService.getSortDir() ?? null,
  };

  const [labels, setLabels] = useState<LabelModel[]>([]);
  const [attributesPaginated, setAttributesPaginated] = useState<
    AttributeListModel[]
  >([]);

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleSearchTextChanges = (searchText: string): void => {
    if (searchText === '') {
      setFilters((prev) => ({ ...prev, offset: 0, searchText: null }));
      LocalStorageService.removeSearchText();
    } else {
      setFilters((prev) => ({ ...prev, offset: 0, searchText }));
      LocalStorageService.setSearchText(searchText);
    }
  };

  const handleNextAttributesCall = (): void => {
    setFilters((prev) => ({
      ...prev,
      offset: attributesPaginated.length > 0 ? prev.offset + 1 : 0,
    }));
  };

  const getNextSortByCreatedAtDir = (
    current: SortDirectionEnum | null,
  ): SortDirectionEnum | null => {
    const modes = [null, SortDirectionEnum.ASC, SortDirectionEnum.DESC];
    const currentIndex = modes.findIndex((mode) => mode === current) ?? 0;
    return modes[(currentIndex + 1) % modes.length];
  };

  const getNextSortByNameDir = (
    prevDir: SortDirectionEnum | null,
  ): SortDirectionEnum | null => {
    const modes = [SortDirectionEnum.ASC, SortDirectionEnum.DESC];
    const currentIndex = modes.findIndex((mode) => mode === prevDir) ?? 0;
    return modes[(currentIndex + 1) % modes.length];
  };

  const handleOnSortedByChanges = (column: SortColumnsEnum) => {
    setFilters((prev) => {
      const newDir =
        column === SortColumnsEnum.NAME
          ? getNextSortByNameDir(prev.sortDir)
          : getNextSortByCreatedAtDir(prev.sortDir);

      !!newDir
        ? LocalStorageService.setSortDir(newDir)
        : LocalStorageService.removeSortDir();
      LocalStorageService.setSortBy(column);

      return {
        ...prev,
        offset: 0,
        sortBy: newDir ? column : null,
        sortDir: newDir,
      };
    });
  };

  const handleOnDelete = (id: string): void => {
    if (window.confirm('Are you sure you want to delete this attribute?')) {
      AttributesService.deleteAttribute(id)
        .then(() => setFilters((prev) => ({ ...prev, offset: 0 })))
        .catch(() => alert('Failed to delete attribute'));
    }
  };

  // here is some problem in these 2 effects which causes more requests on init,
  // but I didn't manage to fix it :(
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
          offset: filters.offset,
          searchText: filters.searchText ?? undefined,
          sortBy: filters.sortBy ?? undefined,
          sortDir: filters.sortDir ?? undefined,
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
  }, [filters]);

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
        handleOnSortedByChanged={handleOnSortedByChanges}
      />
    </Container>
  );
};

export default AttributeListPage;
