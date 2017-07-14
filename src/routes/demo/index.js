import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { Sales, List, Completed} from './components'
import { color } from 'utils'
import { Table, DatePicker,Icon,Menu, Dropdown } from 'antd';

function Demo ({ demo }) {
  const { sales, completed} = demo
  const {MonthPicker} = DatePicker

  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
    ),
  }];

  const data = [{
    key: '1',
    name: 'John Brow',
    name: 'Jim Green',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }];

  const state = {
  };

  const onClickMenu = function ({ key }) {
    console.log(key);
    if(key=='day'){
      let day = document.getElementById('day_id');
      console.log(day);
      day.style.display = 'block';
      let month = document.getElementById('month_id');
      month.style.display = 'none';
    }else if(key=='week'){
    }else{
      let day = document.getElementById('day_id');
      console.log(day);
      day.style.display = 'none';
      let month = document.getElementById('month_id');
      month.style.display = 'block';
    }
  };

  const menu = (
    <Menu onClick={onClickMenu}>
      <Menu.Item key="day">日
      </Menu.Item>
      <Menu.Item key="week">周
      </Menu.Item>
      <Menu.Item key="month">月
      </Menu.Item>
    </Menu>
  );

  function onChange(date, dateString) {
    console.log(date, dateString);
  }


  return (
      <Row gutter={24}>
        <Col lg={24} md={24}>
          <Card bordered={false} bodyStyle={{
                padding: '24px 36px 24px 0',
              }}>
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link">
                    Hover me <Icon type="down" />
              </a>
            </Dropdown>
            <DatePicker id='day_id' style={{

            }} onChange={onChange} />
            <MonthPicker id='month_id' style={{
              display:'none'
            }} onChange={onChange} />
          </Card>
        </Col>
        <Col lg={24} md={24}>
          <Card bordered={false} bodyStyle={{
            padding: '24px 36px 24px 0',
          }}>
            <Sales data={sales} />
          </Card>
        </Col>
        <Col lg={24} md={24}>
          <Card bordered={false} bodyStyle={{
            padding: '24px 36px 24px 0',
          }}>
            <Completed data={completed} />
          </Card>
        </Col>
        <Col lg={24} md={24}>
          <Card bordered={true} bodyStyle={{
            padding: '24px 36px 24px 0',
          }}>
            <Table dataSource={data} columns={columns} />
          </Card>
        </Col>

      </Row>
  )
}

Demo.propTypes = {
  demo: PropTypes.object,
}

export default connect(({ demo }) => ({ demo }))(Demo)
