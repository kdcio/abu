import generatePolicy from '@kdcio/aws-policy';
import Debug from 'debug';
import ApiAccess from 'model/lib/entities/ApiAccess';

const debug = Debug('lambda:auth');

const authorize = async ({ token, methodArn }) => {
  debug(token);

  try {
    const res = await ApiAccess.query(`KEY#${token}`, {
      index: 'GSI2',
    });
    debug(res);
    return generatePolicy({
      context: {},
      principalId: 'user',
      effect: 'Allow',
      methodArn,
      resources: ['GET/*'],
      // resources: resources && resources[role] ? resources[role] : null,
    });
  } catch (error) {
    debug(error);
    throw Error('Unauthorized');
  }
};

export default authorize;
