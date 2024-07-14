import './attribute-search.scss';
import { Button, Container, Form } from 'react-bootstrap';
import { useState } from 'react';

type AttributeSearchProps = {
  initialValue?: string;
  onSearchCallback: (searchText: string) => void;
};

const AttributeSearch = ({
  initialValue,
  onSearchCallback,
}: AttributeSearchProps) => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <Container className='d-flex justify-content-between gap-3'>
      <Form.Control
        placeholder='Search...'
        defaultValue={initialValue}
        onChange={(event) => setSearchText(event.target.value)}
      ></Form.Control>
      <Button onClick={() => onSearchCallback(searchText)}>Search</Button>
    </Container>
  );
};

export default AttributeSearch;
