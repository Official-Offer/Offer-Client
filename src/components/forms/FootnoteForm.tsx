import { Typography } from "antd";
import Link from "next/link";

export const FootnoteForm: React.FC = ({embedLogin}: boolean) => {
  return (
    <div>
      <hr />
      {embedLogin ?
        <Typography.Text type="secondary">
          Đã có tài khoản? <br />
          <Typography.Text underline>
            <Link href="/student/login">Đăng nhập tại đây</Link>
          </Typography.Text>
        </Typography.Text>
      :
        <Typography.Text type="secondary">
          Chưa có tài khoản? <br />
          <Typography.Text underline>
            <Link href="/student/registration">Đăng ký tại đây</Link>
          </Typography.Text>
        </Typography.Text>
      }
      <br />
      <br />
      <Typography.Text type="secondary">
        Bạn là nhà tuyển dụng hoặc cố vấn? <br />
        <Typography.Text underline>
          <Link href="/student/login">Đăng ký/Đăng nhập tại đây</Link>
        </Typography.Text>
      </Typography.Text>
    </div>
  );
}


