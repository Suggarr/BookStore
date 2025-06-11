import Layout, {Content, Footer, Header} from "antd/es/layout/layout";
import {Menu} from "antd";
import { ReactNode } from "react";
import Link from "next/link";

const items = [
  { key: "home", label: <Link href = {"/"}> Home</Link> },
  { key: "books", label: <Link href = {"/books"}>Books</Link>}
];

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout style ={{ minHeight: "100vh"}}>
            <Header>
              <Menu   theme = "dark" mode ="horizontal" items ={items} style = {{flex: 1, minWidth: 0}}/> 
            </Header>{""}
            <Content style = {{padding: " 0 48 px"}}>{children}</Content>
            <Footer style = {{textAlign: "center"}}>
              Книжный магазин 2025, Илья Сахаревич 
            </Footer>
        </Layout>
      </body>
    </html>
  );
}
