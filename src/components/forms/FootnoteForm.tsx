import { Typography } from "antd";
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
    <div className="footnote">
      <hr />
      {embedLogin ? (
        <div>
          <Typography.Text underline>
            <Link href="/registration">Đăng ký</Link>
          </Typography.Text>
          <br />
          <Typography.Text underline>
            <Link href="/registration/forgetPassword">Quên mật khẩu?</Link>
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
