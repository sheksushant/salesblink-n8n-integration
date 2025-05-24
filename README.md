# n8n-nodes-salesblink

This is an n8n community node. It lets you use SalesBlink in your n8n workflows.

SalesBlink is a sales outreach automation platform that helps you send cold emails, and track engagement, all in one place. This node allows you to automate interactions with the SalesBlink API directly from your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following operations:

### Lists
- **Add Contacts to List**: Add one or more new contacts to a SalesBlink list.

### Activity
- **Get Opens**: Retrieve open events from SalesBlink.
- **Get Clicks**: Retrieve click events from SalesBlink.
- **Get Replies**: Retrieve reply events from SalesBlink.

## Credentials

To use this node, you need to authenticate with SalesBlink:
1. [Sign up](https://salesblink.io/) for a SalesBlink account if you don't have one.
2. Log in to your SalesBlink dashboard and create a new API key.
3. In n8n, add new credentials for SalesBlink and paste your API key into the credentials form.

## Compatibility

- This node requires Node.js version 20.15 or higher.
- It uses n8n Nodes API version 1.
- As this is the initial release, compatibility with other n8n versions has not been extensively tested. Please report any issues you encounter.

## Usage

After installing the node and setting up your credentials:

- **Add Contacts to List**: Use the "Lists" resource and select the "Add Contacts to List" operation. Provide the List ID and the contact details you want to add. You can add multiple contacts at once and include custom fields if needed.
- **Get Opens, Clicks, or Replies**: Use the "Activity" resource and select the desired operation. You can filter results by sequence ID or recipient email address.

Typical workflow example:
1. Trigger your workflow (e.g., on a schedule).
2. Use the SalesBlink node to add contacts or fetch activity data.
3. Process the results or pass them to other nodes in your workflow.

For more details on available fields and API behavior, refer to the [SalesBlink API documentation](https://salesblink.io/api).

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [SalesBlink API documentation](https://salesblink.io/api)

## Version history

- **0.1.1**: Initial release. Future changes and updates will be documented here.
