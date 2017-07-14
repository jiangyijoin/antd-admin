import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { Sales, List, Completed} from './components'
import { color } from 'utils'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Demo ({ demo }) {
  const { sales,list, completed} = demo


  return (
    <div className="content-inner">
      <Row gutter={24}>
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
      </Row>
    </div>
  )
}

Demo.propTypes = {
  demo: PropTypes.object,
}

export default connect(({ demo }) => ({ demo }))(Demo)
