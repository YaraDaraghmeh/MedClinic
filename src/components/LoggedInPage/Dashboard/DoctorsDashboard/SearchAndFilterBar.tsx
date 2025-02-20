import { Input, Select, Button } from "antd";
import { SearchOutlined, FilterOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";

const SearchAndFilterBar = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder
}: any) => (
  <div className="flex flex-col gap-4 mb-6 lg:flex-row">
    <Input
      placeholder="Search appointments..."
      prefix={<SearchOutlined />}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="lg:w-64"
    />
    
    <Select
      value={statusFilter}
      onChange={setStatusFilter}
      suffixIcon={<FilterOutlined />}
      className="lg:w-48"
    >
      <Select.Option value="all">All Statuses</Select.Option>
      <Select.Option value="pending">Pending</Select.Option>
      <Select.Option value="confirmed">Confirmed</Select.Option>
      <Select.Option value="completed">Completed</Select.Option>
      <Select.Option value="canceled">Canceled</Select.Option>
    </Select>

    <Button
      icon={sortOrder === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
      onClick={() => setSortOrder((prev: string) => prev === 'asc' ? 'desc' : 'asc')}
    >
      Sort {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
    </Button>
  </div>
);

export default SearchAndFilterBar;