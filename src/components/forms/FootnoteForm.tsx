import { Space, Typography } from "antd";
import Link from "next/link";

type FootnoteFormProps = {
  type?: string;
  embedLogin?: boolean;
};

export const FootnoteForm: React.FC<FootnoteFormProps> = ({
  type,
  embedLogin,
}) => {
  return (
    <div>
      <hr />
      {embedLogin ? (
        <div>
            <Space direction="vertical" size={0}>
              <Typography.Text>
                <Link href="/registration/forgetPassword">Quên mật khẩu?</Link>
              </Typography.Text>
              <Typography.Text>
                <Typography.Text type="secondary" underline={false}>
                  {"Chưa có tài khoản? "}
                </Typography.Text>
                <Link href="/registration">Đăng ký tại đây</Link>
              </Typography.Text>
            </Space>
        </div>
      ) : (
        <Typography.Text type="secondary">
          Đã có tài khoản? <br />
          <Typography.Text>
            <Link href="/login">Đăng nhập tại đây</Link>
          </Typography.Text>
        </Typography.Text>
      )}
    </div>
  );
};
