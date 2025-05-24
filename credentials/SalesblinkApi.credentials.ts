import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class SalesblinkApi implements ICredentialType {
	name = 'salesblinkApi';
	displayName = 'SalesBlink API';
	documentationUrl = 'https://salesblink.io/api/#introduction';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				authorization: '={{$credentials.apiKey}}',
			},
		},
	};
}
