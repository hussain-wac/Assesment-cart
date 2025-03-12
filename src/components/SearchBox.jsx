import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery }); // Update URL search params
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <Form onSubmit={handleSearch} className="mb-4">
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <SearchIcon className="me-2" />
        </InputGroup.Text>
        <Form.Control
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products..."
          aria-label="Search"
          aria-describedby="basic-addon1"
          className="rounded-end"
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
