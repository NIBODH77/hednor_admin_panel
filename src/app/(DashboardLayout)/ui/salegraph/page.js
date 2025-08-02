'use client';
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { Card, CardTitle, CardBody, Row, Col, Button } from 'reactstrap';

const data = [
  {
    name: 'May',
    Messages: 80,
    Views: 190,
    Shares: 130,
    Favorites: 240,
    MessagesLabel: '+0',
    ViewsLabel: '+20',
    SharesLabel: '+15',
    FavoritesLabel: '+23',
  },
  {
    name: 'June',
    Messages: 190,
    Views: 190,
    Shares: 130,
    Favorites: 110,
    MessagesLabel: '+2',
    ViewsLabel: '+5',
    SharesLabel: '+14',
    FavoritesLabel: '+11',
  },
  {
    name: 'July',
    Messages: 140,
    Views: 210,
    Shares: 160,
    Favorites: 200,
    MessagesLabel: '+18',
    ViewsLabel: '+6',
    SharesLabel: '+23',
    FavoritesLabel: '+10',
  },
];

const SaleGraph = () => {
  const [isBarChart, setIsBarChart] = useState(true);

  const toggleChart = () => {
    setIsBarChart(!isBarChart);
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bar-chart-line-fill me-2"></i>
            Sales Activity Graph
          </CardTitle>
          <CardBody>
            <Button color="primary" onClick={toggleChart} className="mb-3" height="30px">
              Toggle Graph
            </Button>
            <ResponsiveContainer width="100%" height={480}>
              {isBarChart ? (
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                  barGap={10}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Messages" fill="#4E9A9A">
                    <LabelList dataKey="MessagesLabel" position="top" />
                  </Bar>
                  <Bar dataKey="Views" fill="#FBC02D">
                    <LabelList dataKey="ViewsLabel" position="top" />
                  </Bar>
                  <Bar dataKey="Shares" fill="#E53935">
                    <LabelList dataKey="SharesLabel" position="top" />
                  </Bar>
                  <Bar dataKey="Favorites" fill="#0D47A1">
                    <LabelList dataKey="FavoritesLabel" position="top" />
                  </Bar>
                </BarChart>
              ) : (
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Messages" stroke="#4E9A9A" />
                  <Line type="monotone" dataKey="Views" stroke="#FBC02D" />
                  <Line type="monotone" dataKey="Shares" stroke="#E53935" />
                  <Line type="monotone" dataKey="Favorites" stroke="#0D47A1" />
                </LineChart>
              )}
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SaleGraph;
