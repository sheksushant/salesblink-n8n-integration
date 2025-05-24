import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

export class SalesBlink implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SalesBlink',
		name: 'salesBlink',
		icon: 'file:salesblink.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with SalesBlink API',
		defaults: {
			name: 'SalesBlink',
		},
		inputs: ['main' as NodeConnectionType],
		outputs: ['main' as NodeConnectionType],
		credentials: [
			{
				name: 'salesblinkApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://run.salesblink.io/api/public',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'List', value: 'list' },
					{ name: 'Activity', value: 'activity' },
				],
				default: 'list',
			},
			// List operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['list'] } },
				options: [
					{
						name: 'Add Contacts to List',
						value: 'addContacts',
						action: 'Add new contacts to a salesblink list',
						description: 'Add one or more new contacts to a SalesBlink list',
					},
				],
				default: 'addContacts',
			},
			{
				displayName: 'List ID',
				name: 'list_id',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the list to add contacts to',
				displayOptions: { show: { resource: ['list'], operation: ['addContacts'] } },
			},
			{
				displayName: 'Contacts',
				name: 'contacts',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				required: true,
				description: 'One or more contacts to add',
				default: [],
				displayOptions: { show: { resource: ['list'], operation: ['addContacts'] } },
				options: [
					{
						displayName: 'Contact',
						name: 'contact',
						values: [
							{
								displayName: 'City',
								name: 'City',
								type: 'string',
								default: '',
								description: 'City of the contact (optional)',
							},
							{
								displayName: 'Company Name',
								name: 'Company_Name',
								type: 'string',
								default: '',
								description: 'Company name of the contact (optional)',
							},
							{
								displayName: 'Country',
								name: 'Country',
								type: 'string',
								default: '',
								description: 'Country of the contact (optional)',
							},
							{
								displayName: 'Department',
								name: 'Department',
								type: 'string',
								default: '',
								description: 'Department of the contact (optional)',
							},
							{
								displayName: 'Email',
								name: 'Email',
								type: 'string',
								required: true,
								default: '',
								description: 'The email address of the contact',
							},
							{
								displayName: 'First Name',
								name: 'First_Name',
								type: 'string',
								default: '',
								description: 'First name of the contact (optional)',
							},
							{
								displayName: 'Job Title',
								name: 'Job_Title',
								type: 'string',
								default: '',
								description: 'Job title of the contact (optional)',
							},
							{
								displayName: 'Last Name',
								name: 'Last_Name',
								type: 'string',
								default: '',
								description: 'Last name of the contact (optional)',
							},
							{
								displayName: 'Office Phone',
								name: 'Office_Phone',
								type: 'string',
								default: '',
								description: 'Office phone number of the contact (optional)',
							},
							{
								displayName: 'Phone',
								name: 'Phone',
								type: 'string',
								default: '',
								description: 'Phone number of the contact (optional)',
							},
							{
								displayName: 'State',
								name: 'State',
								type: 'string',
								default: '',
								description: 'State/Province of the contact (optional)',
							},
							{
								displayName: 'Street',
								name: 'Street',
								type: 'string',
								default: '',
								description: 'Street address of the contact (optional)',
							},
							{
								displayName: 'Website',
								name: 'Website',
								type: 'string',
								default: '',
								description: 'Website URL of the contact (optional)',
							},
						],						
					},
				],
			},
			{
				displayName: 'Custom Fields',
				name: 'customFields',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				default: [],
				description: 'Add custom contact fields',
				displayOptions: { show: { resource: ['list'], operation: ['addContacts'] } },
				options: [
					{
						displayName: 'Field',
						name: 'field',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								required: true,
								default: '',
								description: 'The name of the custom field',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								required: true,
								default: '',
								description: 'The value of the custom field',
							},
						],
					},
				],
			},
			{
				displayName: 'Remove Duplicates',
				name: 'remove_duplicates',
				type: 'boolean',
				default: true,
				description: 'Whether to remove duplicate contacts',
				displayOptions: { show: { resource: ['list'], operation: ['addContacts'] } },
			},
			// Activity operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['activity'] } },
				options: [
					{
						name: 'Get Opens',
						description: 'Get opens from salesblink',
						value: 'getOpens',
						action: 'Get opens',
					},
					{
						name: 'Get Clicks',
						description: 'Get clicks from salesblink',
						value: 'getClicks',
						action: 'Get clicks',
					},
					{
						name: 'Get Replies',
						description: 'Get replies from salesblink',
						value: 'getReplies',
						action: 'Get replies',
					},
				],
				default: 'getOpens',
			},
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						resource: ['activity'],
						operation: ['getOpens', 'getClicks', 'getReplies'],
					},
				},
				options: [
					{
						displayName: 'Sequence ID',
						name: 'sequence_id',
						type: 'string',
						default: '',
						description: 'Filter by sequence ID',
					},
					{
						displayName: 'Recipient Email',
						name: 'recipient_email_address',
						type: 'string',
						default: '',
						description: 'Filter by recipient email address',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				if (resource === 'list' && operation === 'addContacts') {
					const listId = this.getNodeParameter('list_id', i) as string;
					const contacts = this.getNodeParameter('contacts.contact', i) as Array<{
						Email: string;
						First_Name?: string;
						Last_Name?: string;
						Phone: string;
						Company_Name?: string;
						Office_Phone?: string;
						Job_Title: string;
						Department?: string;
						Street?: string;
						City: string;
						State?: string;
						Country?: string;
						Website?: string;
					}>;
					const removeDuplicates = this.getNodeParameter('remove_duplicates', i) as boolean;

					const customFieldsData = this.getNodeParameter('customFields.field', i, []) as Array<{
						name: string;
						value: string;
					}>;

					const formattedCustomFields: { [key: string]: any } = {};
					if (customFieldsData.length > 0) {
						for (const field of customFieldsData) {
							formattedCustomFields[field.name] = field.value;
						}
					}

					const contactsWithCustomFields = contacts.map((contact) => ({
						...contact,
						...(Object.keys(formattedCustomFields).length > 0 ? formattedCustomFields : {}), // Only spread custom fields if there are any
					}));

					responseData = await this.helpers.requestWithAuthentication.call(this, 'salesblinkApi', {
						method: 'POST',
						url: `https://run.salesblink.io/api/public/contacts`,
						body: {
							list_id: listId,
							remove_duplicates: removeDuplicates,
							contacts: contactsWithCustomFields,
						},
					});
				} else if (resource === 'activity') {
					const filters = this.getNodeParameter('filters', i) as {
						sequence_id?: string;
						recipient_email_address?: string;
					};
					const qs: any = {};
					if (filters.sequence_id) qs.sequence_id = filters.sequence_id;
					if (filters.recipient_email_address)
						qs.recipient_email_address = filters.recipient_email_address;

					let endpoint = 'https://run.salesblink.io/api/public';
					if (operation === 'getOpens') endpoint += '/opens';
					if (operation === 'getClicks') endpoint += '/clicks';
					if (operation === 'getReplies') endpoint += '/replies';

					responseData = await this.helpers.requestWithAuthentication.call(this, 'salesblinkApi', {
						method: 'GET',
						url: endpoint,
						qs,
					});
				}

				const text = responseData.toString('utf8');
				const data = JSON.parse(text);
				returnData.push(...this.helpers.returnJsonArray(data));
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return this.prepareOutputData(returnData);
	}
}
