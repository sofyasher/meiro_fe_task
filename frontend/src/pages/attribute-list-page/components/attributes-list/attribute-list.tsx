import './attribute-list.scss';
import AttributeTable from '../attribute-table/attribute-table';
import { AttributeListModel } from '../../../../shared/model/attribute-list.model';
import { SortColumnsEnum } from '../../../../shared/enum/sort-columns.enum';

type AttributeListProps = {
  attributesPaginated: AttributeListModel[];
  handleNextAttributesCall: () => void;
  handleOnDelete: (id: string) => void;
  handleOnSortedByChanged: (column: SortColumnsEnum) => void;
};

const AttributeList = ({
  attributesPaginated,
  handleNextAttributesCall,
  handleOnDelete,
  handleOnSortedByChanged,
}: AttributeListProps) => {
  return (
    <>
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
            onNextAttributesCallCallback={handleNextAttributesCall}
            onAttributeDeleteCallback={handleOnDelete}
            onSortedByChangedCallback={handleOnSortedByChanged}
          />
        </div>
      )}
    </>
  );
};

export default AttributeList;
