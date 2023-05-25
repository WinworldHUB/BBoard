import * as React from "react";
import { IBBoardProps } from "./IBBoardProps";
import { Col, Container, Row, Table } from "react-bootstrap";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import "bootstrap/dist/css/bootstrap.css";

export interface BBItem {
  Id: number;
  Title: string;
  field_1: string;
  field_2: string;
  field_3: string;
  Created: string;
  Modified: string;
  Author: {
    Title: string;
  };
}

const BBoard: React.FC<IBBoardProps> = (props) => {
  const [bbData, setBBData] = React.useState<BBItem[]>([]);
  const { ctx } = props;

  const getBBData = (): void => {
    ctx.spHttpClient
      .get(
        ctx.pageContext.web.absoluteUrl +
          "/sites/bbdemo/_api/web/lists/GetByTitle('BBSections')/Items",
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        const queryResult = response.json();
        queryResult
          .then((data) => setBBData(data.value as BBItem[]))
          .catch(() => {
            // Error logging
          });
      })
      .catch(() => {
        // Error logging
       });
  };

  React.useEffect(() => {
    getBBData();
  }, []);

  React.useEffect(() => {
    if (bbData) {
      // Logging received data
    }
  }, [bbData]);

  return (
    <Container>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Section</th>
                <th>Sub Section</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {bbData.map((item) => (
                <tr key={item.Id}>
                  <td>{item.Title}</td>
                  <td>{item.field_1}</td>
                  <td>{item.field_2}</td>
                  <td>{item.field_3}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default BBoard;
