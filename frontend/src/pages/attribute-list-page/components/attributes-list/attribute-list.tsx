import './attribute-list.scss';
import AttributeTable from '../attribute-table/attribute-table';
import { AttributeListModel } from '../../../../shared/model/attribute-list.model';

type AttributeListProps = {
  attributesPaginated: AttributeListModel[];
  handleNextAttributesCall: () => void;
  handleOnDelete: (id: string) => void;
};

const AttributeList = ({
  attributesPaginated,
  handleNextAttributesCall,
  handleOnDelete,
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
            nextAttributesCallCallback={handleNextAttributesCall}
            onDeleteCallback={handleOnDelete}
          />
        </div>
      )}
    </>
  );
};

export default AttributeList;
