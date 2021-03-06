import React, { Component } from "react";
import { Table, Accordion, Card, Button } from "react-bootstrap";
import "./menusStatistics.scss";

export default class WorkoutsStatistics extends Component {
  state = {
    menus: []
  };

  numberOfMeal = 0;

  async componentDidMount() {
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };

    try {
      let response = await fetch("/menus", {
        method: "get",
        headers: requestHeaders
      });
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ menus: response });
    } catch (error) {
      console.log(error);
    }
  }

  renderProduct = el => {
    return (
      <tr key={el.numberProduct}>
        <td> {el.newProductName}</td>
        <td>{el.weight} g</td>
        <td>{el.numberOfCalories} kcal</td>
        <td>{el.numberOfProteins} g</td>
        <td>{el.numberOfCarbohydrates} g</td>
        <td>{el.numberOfFats} g</td>
      </tr>
    );
  };

  renderMeal = el => {
    this.numberOfMeal += 1;
    return (
      <div key={Math.random()} className="statistics__menus__meal">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan="6">
                <span className="numberOfMeal">
                  Posiłek {this.state.numberOfMeal}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Produkt</td>
              <td>Ilość</td>
              <td>Kalorie</td>
              <td>Białko</td>
              <td>Węglowodany</td>
              <td>Tłuszcze</td>
            </tr>
            {el.products.map(this.renderProduct)}
            <tr>
              <td />
              <td />
              <td>{el.summary.calories} kcal</td>
              <td>{el.summary.proteins} g</td>
              <td>{el.summary.carbohydrates} g</td>
              <td>{el.summary.fats} g</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };

  render() {
    return (
      <section className="statistics__menus">
        <Accordion>
          {this.state.menus
            ? this.state.menus.map(el => (
                <Card key={el._id}>
                  <Card.Header>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      key={el._id}
                      eventKey={el.date}
                    >
                      {el.date}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={el.date}>
                    <Card.Body>
                      {el.meals.map(this.renderMeal)}
                      <Table
                        className="statistics__menus__summaryTable"
                        striped
                        bordered
                        hover
                        variant="dark"
                      >
                        <thead>
                          <tr>
                            <td />
                            <td>Kalorie</td>
                            <td>Białko</td>
                            <td>Węglowodany</td>
                            <td>Tłuszcze</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="summaryDay">Suma dobowa</td>
                            <td>{el.summary.calories} kcal</td>
                            <td>{el.summary.proteins} g</td>
                            <td>{el.summary.carbohydrates} g</td>
                            <td>{el.summary.fats} g</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))
            : null}
        </Accordion>
      </section>
    );
  }
}
