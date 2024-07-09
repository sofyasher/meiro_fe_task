import './attribute-search.scss';
import { Button, Container, Form } from 'react-bootstrap';
import { useState } from 'react';

type AttributeSearchProps = {
  onSearchCallback: (searchQuery: string) => void;
};

const AttributeSearch = ({ onSearchCallback }: AttributeSearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <Container className='d-flex justify-content-between gap-3'>
      <Form.Control
        placeholder='Search...'
        onChange={(event) => setSearchQuery(event.target.value)}
      ></Form.Control>{' '}
      <Button onClick={() => onSearchCallback(searchQuery)}>Search</Button>
    </Container>
  );
};

export default AttributeSearch;
