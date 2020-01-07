const url =
    'https://hooks.slack.com/services/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'
const { IncomingWebhook } = require('@slack/webhook')
const CI_BRANCH = process.env.CIRCLE_BRANCH
const CI_PROJECT = process.env.CIRCLE_PROJECT_REPONAME
const CI_PULLREQUEST = process.env.CI_PULL_REQUESTS
const CI_USERNAME = process.env.CIRCLE_USERNAME

export const reportToSlack = (result, summary) => {
    const webhook = new IncomingWebhook(url)
    ;(async () => {
        await webhook.send({
            username: 'Bundlesize checker',
            icon_emoji: ':scales:',
            text: `A new build arrived by ${CI_USERNAME}! ${summary}`,
            attachments: [
                {
                    color: '#008000',
                    fields: [
                        {
                            title: 'Project',
                            value: `${CI_PROJECT}`,
                            short: true,
                        },
                        {
                            title: 'Branch',
                            value: `${CI_BRANCH}`,
                            short: true,
                        },
                        {
                            title: 'Bundle name',
                            value: `${result.filePath}`,
                            short: false,
                        },
                        {
                            title: 'Original size',
                            value: `${result.baseBranchSize / 1024} KB`,
                            short: true,
                        },
                        {
                            title: 'Current size',
                            value: `${result.size / 1024} KB`,
                            short: true,
                        },
                    ],
                    actions: [
                        {
                            type: 'button',
                            text: 'Show pull request',
                            url: CI_PULLREQUEST,
                        },
                        {
                            type: 'button',
                            text: 'Show detailed results',
                            url: url,
                        },
                    ],
                },
            ],
        })
    })()
}
