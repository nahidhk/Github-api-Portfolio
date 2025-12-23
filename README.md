<!-- GitAds-Verify: GS46I4OG2E4HFW7YWBI2H2818U3KNLCJ -->
# GitHub API Portfolio

This portfolio website loads data directly from GitHub. It is an open-source project. Anyone can use it as long as they have a GitHub account. Once you fork the repository, you can set it up and publish it using **Vercel**. You can directly edit components and content using the open-source files.

---

## Setup Guide

### Step 1: Fork the Repository

First, fork this repository to your GitHub profile.

---

### Step 2: Edit the User Data

Next, open the following file to edit your personal information:

```bash
Repository/
 └─ src/
     └─ data/
         └─ username.json
```

You will see a JSON structure like this:

```json
{
  "github_username": "nahidhk",
  "telegram_username": "NahidTdOfficial",
  "facebook_id_username": "nahid.td",
  "linkedIn_username": "nahidhk",
  "whatsapp_number": "8801763279587",
  "snapchat_username": "@nahid.td",
  "twitter_X_username": "nahidtdx"
}
```

Here you should replace the values with your own social media usernames. If you do not have a particular social media account, you can set it to `null` like this:

```json
"snapchat_username": null
```

---

### Step 3: Publish with Vercel

After editing, you can deploy your portfolio website using **Vercel**. Connect your forked repository to Vercel, click the **Deploy** button, and your website will be live immediately.
