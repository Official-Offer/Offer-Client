import { Typography } from "antd";
import Link from "next/link";

type FootnooteFormProps = {
  embedLogin?: boolean;
}

export const FootnoteForm: React.FC<FootnooteFormProps> = ({ embedLogin }) => {
  return (
    <div>
      <hr />
      {embedLogin ?
        <Typography.Text type="secondary">
          Đã có tài khoản? <br />
          <Typography.Text underline>
            <Link href="/login">Đăng nhập tại đây</Link>
          </Typography.Text>
        </Typography.Text>
      :
        <Typography.Text type="secondary">
          Chưa có tài khoản? <br />
          <Typography.Text underline>
            <Link href="/">Đăng ký tại đây</Link>
          </Typography.Text>
        </Typography.Text>
      }
      <br />
      <br />
      <Typography.Text type="secondary">
        Bạn là nhà tuyển dụng hoặc cố vấn? <br />
        <Typography.Text underline>
          <Link href="/login">Đăng ký/Đăng nhập tại đây</Link>
        </Typography.Text>
      </Typography.Text>
    </div>
  );
}


