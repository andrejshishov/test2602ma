import { Alert, Space } from 'antd';
import './ErrorMessage.css';

function ErrorMessage({ message }) {
  return (
    <Space direction="vertical" className="errorMessage">
      <Alert message="Error!" description={message} type="error" closable />
    </Space>
  );
}

export default ErrorMessage;