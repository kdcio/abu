import generatePolicy from '@kdcio/aws-policy';
import Debug from 'debug';
import ApiAccess from 'model/lib/entities/ApiAccess';

import permissions from './permissions';

const debug = Debug('lambda:auth');

const authorize = async ({ token, methodArn }) => {
  debug(token);

  try {
    const res = await ApiAccess.query(`KEY#${token}`, {
      index: 'GSI2',
    });
    debug(res);
    if (!res || res.Count === 0) throw Error('Unauthorized');

    const access = res.Items[0];

    // build permission
    const resources = permissions(access);
    debug(resources);

    return generatePolicy({
      context: {},
      principalId: access.id,
      effect: 'Allow',
      methodArn,
      resources,
    });
  } catch (error) {
    debug(error);
    throw Error('Unauthorized');
  }
};

export default authorize;
