import './attribute-search.scss';
import { Container, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

type AttributeSearchProps = {
  initialValue?: string;
  onSearchCallback: (searchText: string) => void;
};

const AttributeSearch = ({
  initialValue,
  onSearchCallback,
}: AttributeSearchProps) => {
  const [searchText, setSearchText] = useState<string>(initialValue ?? '');

  useEffect(() => {
    const runSearch = setTimeout(() => {
      onSearchCallback(searchText);
    }, 500);

    return () => clearTimeout(runSearch);
  }, [searchText]);

  return (
    <Container className='d-flex justify-content-between gap-3'>
      <Form.Control
        placeholder='Search...'
        defaultValue={initialValue}
        onChange={(event) => setSearchText(event.target.value)}
      ></Form.Control>
    </Container>
  );
};

export default AttributeSearch;
