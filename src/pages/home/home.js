import React, { useState } from 'react';
import { Alert, Anchor, Button, Form, Input, Switch } from 'antd';
import {createEmpTransaction, createIncomeTransaction} from '../../actions/transaction';
import {createEmpCollection, createIncomeCollection} from '../../actions/collection';
import {employmentVerify, incomeVerify} from '../../actions/verification';
import RetrieveExampleJson from '../../constants/retrieve-example.json';
import './home.css';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Link } = Anchor;

export default function Home() {

  const [errorEmpVerify, setErrorEmpVerify] = useState();
  const [errorIncomeVerify, setErrorIncomeVerify] = useState();
  const [dataEmpVerify, setDataEmpVerify] = useState();
  const [dataIncomeVerify, setDataIncomeVerify] = useState();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const {
      transaction_id,
      collection_id,
      manual_verification,
      exclude_borrower,
      dry_run,
      income_transaction_id,
      income_collection_id,
      income_manual_verification,
      income_exclude_borrower,
      income_dry_run,
    } = values;
    const empParams = {
      transaction_id,
      collection_id,
      partner_name: 'default',
      options: {
        manual_verification,
        exclude_borrower,
        dry_run
      }
    };
    const incomeParams = {
      transaction_id: income_transaction_id,
      collection_id: income_collection_id,
      partner_name: 'default',
      options: {
        manual_verification: income_manual_verification,
        exclude_borrower: income_exclude_borrower,
        dry_run: income_dry_run
      }
    }
    employmentVerify(empParams).then(data => {
      if (data.collection_id) {
        setDataEmpVerify(data);
      } else {
        setErrorEmpVerify(JSON.stringify(data));
      }
    });
    incomeVerify(incomeParams).then(data => {
      if (data.collection_id) {
        setDataIncomeVerify(data);
      } else {
        setErrorIncomeVerify(JSON.stringify(data));
      }
    });
  };

  const onReset = () => {
    form.resetFields();
    setErrorEmpVerify(null);
    setErrorIncomeVerify(null);
    setDataEmpVerify(null);
    setDataIncomeVerify(null);
  };

  const onCreateEmpTransaction = () => {
    createEmpTransaction().then(data => {
      if (data.transaction_id) {
        form.setFieldsValue({ transaction_id: data.transaction_id });
      } else {
        window.alert(JSON.stringify(data));
      }
    });
  };

  const onCreateIncomeTransaction = () => {
    createIncomeTransaction().then(data => {
      if (data.transaction_id) {
        form.setFieldsValue({ income_transaction_id: data.transaction_id });
      } else {
        window.alert(JSON.stringify(data));
      }
    });
  };

  const onCreateEmpCollection = () => {
    const transactionId = form.getFieldValue('transaction_id');
    const payload = RetrieveExampleJson;
    createEmpCollection(transactionId, payload).then(data => {
      if (data.collection_id) {
        form.setFieldsValue({ collection_id: data.collection_id });
      } else {
        // forcely place the collection id
        form.setFieldsValue({ collection_id: '01F0KHKADN0HRFXMCQQXPA6AFZ' });
        window.alert(JSON.stringify(data));
      }
    });
  };

  const onCreateIncomeCollection = () => {
    const transactionId = form.getFieldValue('income_transaction_id');
    const payload = RetrieveExampleJson;
    createIncomeCollection(transactionId, payload).then(data => {
      if (data.collection_id) {
        form.setFieldsValue({ income_collection_id: data.collection_id });
      } else {
        window.alert(JSON.stringify(data));
      }
    });
  };

  return (
    <div className="home-container">
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <div>
          <h2>Verify Employment</h2>
          <Form.Item
            label="transaction_id"
            name="transaction_id"
            rules={[{ required: true, message: 'Please create transaction id!' }]}
          >
            <Input
              addonAfter={<div onClick={onCreateEmpTransaction}>create</div>}
              placeholder="create transaction id"
              disabled
            />
          </Form.Item>
          <Form.Item
            label="collection_id"
            name="collection_id"
            rules={[{ required: true, message: 'Please create collection id!' }]}
          >
            <Input
              addonAfter={<div onClick={onCreateEmpCollection}>create</div>}
              placeholder="create collection id"
              disabled
            />
          </Form.Item>
          <Form.Item
            label="manual_verification"
            name="manual_verification"
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Form.Item>
          <Form.Item
            label="exclude_borrower"
            name="exclude_borrower"
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Form.Item>
          <Form.Item
            label="dry_run"
            name="dry_run"
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Form.Item>
          {dataEmpVerify && (
            <Form.Item>
              <span>{dataEmpVerify.status}</span>
              <Anchor>
                <Link href={dataEmpVerify.widget_url} title={dataEmpVerify.widget_url} />
              </Anchor>
            </Form.Item>
          )}
          {errorEmpVerify && (
            <Form.Item>
              <Alert
                message="Employment verification error"
                description={errorEmpVerify}
                type="error"
                closable
                onClose={() => setErrorEmpVerify(null)}
              />
            </Form.Item>
          )}
        </div>
        <div>
          <h2>Verify Income</h2>
          <Form.Item
            label="transaction_id"
            name="income_transaction_id"
            rules={[{ required: true, message: 'Please create transaction id!' }]}
          >
            <Input
              addonAfter={<div onClick={onCreateIncomeTransaction}>create</div>}
              placeholder="create transaction id"
              disabled
            />
          </Form.Item>
          <Form.Item
            label="collection_id"
            name="income_collection_id"
            rules={[{ required: true, message: 'Please create collection id!' }]}
          >
            <Input
              addonAfter={<div onClick={onCreateIncomeCollection}>create</div>}
              placeholder="create collection id"
              disabled
            />
          </Form.Item>
          <Form.Item
            label="manual_verification"
            name="income_manual_verification"
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Form.Item>
          <Form.Item
            label="exclude_borrower"
            name="income_exclude_borrower"
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Form.Item>
          <Form.Item
            label="dry_run"
            name="income_dry_run"
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Form.Item>
          {dataIncomeVerify && (
            <Form.Item>
              <Anchor>
                <Link href={dataIncomeVerify.url} title={dataIncomeVerify.url} />
              </Anchor>
            </Form.Item>
          )}
          {errorIncomeVerify && (
            <Form.Item>
              <Alert
                message="Income verification error"
                description={errorIncomeVerify}
                type="error"
                closable
                onClose={() => setErrorIncomeVerify(null)}
              />
            </Form.Item>
          )}
        </div>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          &nbsp;&nbsp;
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
