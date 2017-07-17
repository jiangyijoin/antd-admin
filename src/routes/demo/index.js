import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { Sales, List, Completed} from './components'
import { color } from 'utils'
import { routerRedux } from 'dva/router'
import { Table, DatePicker,Icon,Select} from 'antd';
import Filter from './Filter'

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
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }];

  const filterProps = {
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/user',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/user',
      }))
    },
    onAdd () {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'user/switchIsMotion' })
    },
  }

  const provinceData = ['Zhejiang', 'Jiangsu'];
  const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
  };

  class App extends React.Component {
    state = {
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
    }
    handleProvinceChange = (value) => {
      this.setState({
        cities: cityData[value],
        secondCity: cityData[value][0],
      });
    }
    onSecondCityChange = (value) => {
      this.setState({
        secondCity: value,
      });
    }
    render() {
      const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
      const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
      return (
        <div>
          <Select defaultValue={provinceData[0]} style={{ width: 90 }} onChange={this.handleProvinceChange}>
            {provinceOptions}
          </Select>
          <Select value={this.state.secondCity} style={{ width: 90 }} onChange={this.onSecondCityChange}>
            {cityOptions}
          </Select>
        </div>
      );
    }
  }

  class App1 extends React.Component {
    state = {
      o: 'inline-block',
      p: 'none',
    }
    handleChange = (value) => {
      if(value=='日'){
        this.setState({
          o:'inline-block',
          p:'none'
        });
      }else{
        this.setState({
          o:'none',
          p:'inline-block'
        });
      }
    }
    render() {
      return (
        <div>
          <Select defaultValue="日" style={{ width: 120 }} onChange={this.handleChange}>
            <Option value="日">日</Option>
            <Option value="月">月</Option>
          </Select>
          <DatePicker style={{width: 120,display:this.state.o}}/>
          <MonthPicker style={{width: 120,display:this.state.p}} />
        </div>
      );
    }
  }



  return (
      <Row gutter={24}>
        <Col lg={24} md={24}>
          <Card bordered={false} bodyStyle={{
            padding: '24px 36px 24px 0',
          }}>
            <App1 />
            <App />
          </Card>
        </Col>
        <Col lg={24} md={24}>
          <Card bordered={false} bodyStyle={{
                padding: '24px 36px 24px 0',
              }}>
            <Filter {...filterProps} />
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
