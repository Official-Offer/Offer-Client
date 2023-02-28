import { Typography } from "antd";
import Link from "next/link";

function FootnoteForm() {
  return (
    <div>
      <hr />
      <Typography.Text type="secondary">
        Đã có tài khoản? <br />
        <Typography.Text underline>
          <Link href="/student/login">Đăng nhập tại đây</Link>
        </Typography.Text>
      </Typography.Text>
      <br />
      <br />
      <Typography.Text type="secondary">
        Bạn là nhà tuyển dụng? <br />
        <Typography.Text underline>
          <Link href="/student/login">Đăng ký/Đăng nhập tại đây</Link>
        </Typography.Text>
      </Typography.Text>
    </div>
  );
}

export default FootnoteForm;


