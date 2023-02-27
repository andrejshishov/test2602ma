import { Alert, Space } from 'antd';
import './ErrorFailedSearch.css';

function ErrorFailedSearch() {
  return (
    <Space className="emptySearchWarning" direction="vertical">
      <Alert message="No results! Do another request!" type="warning" showIcon closable />
    </Space>
  );
}
export default ErrorFailedSearch;