import Header from '/components/Header';

export default async function Page({ searchParams }) {
  try {
    const secretKey = process.env.TOSS_SECRET_KEY || "";
    const basicToken = Buffer.from(`${secretKey}:`, `utf-8`).toString("base64");

    const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('API 요청이 실패했습니다.');
    }

    const payments = await response.json();

    if (!payments || !payments.card) {
      throw new Error('결제 정보가 없습니다.');
    }

    const { card } = payments;

    return (
      <div className="app">
        <Header></Header>
        <div>
          <h1>결제가 완료되었습니다</h1>
          <ul>
            <li>결제 상품 {payments.orderName ?? "정보 없음"}</li>
            <li>주문번호 {payments.orderId ?? "정보 없음"}</li>
            <li>카드회사 {payments.company ?? "정보 없음"}</li>
            <li>카드번호 {card?.number ?? "정보 없음"}</li>
            <li>결제금액 {card?.amount ?? "정보 없음"}</li>
            <li>
              결제승인날짜{" "}
              {payments.approvedAt
                ? Intl.DateTimeFormat().format(new Date(payments.approvedAt))
                : "정보 없음"}
            </li>
          </ul>


        </div>
      </div>
    );
  } catch (error) {
    // 에러 처리를 여기에서 수행하고 사용자에게 에러 메시지를 표시합니다.
    return (
      <div className="app">
        <Header></Header>
        <div>
          <h1>에러 발생</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }
}
