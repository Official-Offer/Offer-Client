import { Typography } from "antd";
import Link from "next/link";

export const FootnoteForm: React.FC<any> = ({
  type,
  embedLogin,
}: {
  type: string;
  embedLogin: boolean;
}) => {
  return (
    <div>
      <hr />
      {embedLogin ? (
        <div>
          <Typography.Text underline>
            <Link href="/">Đăng ký</Link>
          </Typography.Text>
          <br />
          <Typography.Text underline>
            <Link href="/login">Quên mật khẩu?</Link>
          </Typography.Text>
        </div>
      ) : (
        <Typography.Text type="secondary">
          Đã có tài khoản? <br />
          <Typography.Text underline>
            <Link href="/login">Đăng nhập tại đây</Link>
          </Typography.Text>
        </Typography.Text>
      )}
    </div>
  );
};
