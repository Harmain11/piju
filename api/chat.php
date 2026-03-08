<?php
// PIJU Chatbot — Anthropic Claude API handler
// Hostinger shared hosting compatible (PHP + cURL)

// Suppress PHP notices/warnings — they must never corrupt JSON output
error_reporting(0);
ini_set('display_errors', '0');
ob_start(); // capture any stray output so it never reaches the client

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

function send_json($data, $status = 200) {
    ob_end_clean();
    http_response_code($status);
    echo json_encode($data);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_end_clean();
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['error' => 'Method not allowed'], 405);
}

require_once __DIR__ . '/config.php';

$apiKey = ANTHROPIC_API_KEY;
if (!$apiKey || $apiKey === 'your-anthropic-api-key-here') {
    send_json(['error' => 'API key not configured. Edit api/config.php on Hostinger.'], 500);
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || empty($data['message'])) {
    send_json(['error' => 'No message provided'], 400);
}

$userMessage = trim($data['message']);
$history     = isset($data['history']) ? array_slice($data['history'], -10) : [];

$systemPrompt = 'You are PIJU Bot, the official AI assistant for PIJU Coin — a community-driven Solana meme token. You are energetic, friendly, and deeply knowledgeable about everything on the PIJU website. Speak with excitement and positivity, using the PIJU community tone: bold, fun, and crypto-savvy. Keep answers concise and punchy.

Here is everything you know about PIJU:

WHAT IS PIJU?
PIJU is a community-driven meme token built on the Solana blockchain. It is part of the Dark Pinoverse — a crypto universe that includes PINO and DARK PINO. PIJU is described as "DARKPINO\'s kindergarten brother" — representing the innocent beginning, the playful spirit, and the promise of growth. Slogan: "Grow Piju Together" and "Grow together. Rise together. PIJU is here to make history." PIJU is bold, chaotic, and fearless.

TOKEN DETAILS
Ticker: $PIJU. Blockchain: Solana. Tax: 3% (to maximize holder gains). Token Launch: March 15. Status: COMING SOON — token has not launched yet. Token address (CA): Not yet revealed — "TOKEN LAUNCH SOON".

THE TEAM
Created by the same team behind PINO and DARK PINO. They have experience building Solana meme tokens. DARKPINO website: https://darkpino.xyz/

WHERE TO TRADE $PIJU (once live)
Dexscreener, Dextools, Jupiter (Solana DEX aggregator), Gate.io.

ABOUT PIJU CHARACTER
PIJU is a duck-like character wearing a bucket hat with "PIJU" on it. "Stay Chill" — While the world burns around him, PIJU stays relaxed. Diamond hands aren\'t just a meme — they\'re a lifestyle. "To The Moon" — Following in DARKPINO\'s footsteps, PIJU aims for the stars. Part of the Dark Pinoverse legacy.

ROADMAP (6 Phases)
Phase 1 - Token Launch: Token Launch Event, Community Airdrop, DEX Listing, Liquidity Lock, CoinGecko and CMC Listings.
Phase 2 - Community Growth: Ambassador Program, Meme Contests, Influencer Collabs, 10,000 Holders Milestone, Viral Marketing Campaigns.
Phase 3 - NFT Drop: Limited Edition NFT Collection, NFT Holder Benefits, NFT Marketplace Integration, Community Art Submissions, Sustainable Token Flow.
Phase 4 - PijuSwap: Development and Testing, Beta Optimization, PijuSwap Live — featuring Seamless Token Swaps, Fast Solana Transactions, Low Fees and Smooth UX.
Phase 5 - Piju Launchpad: Platform Development, Testing and Refinement, Launchpad Live — for launching your own memecoins, Easy Token Creation, Creator-Friendly Tools.
Phase 6 - Ecosystem Growth: Strategic Partnerships, Enhanced Burn Mechanics, Ecosystem Integrations, Expanded Community and Adoption.

LONG-TERM VISION
PijuCoin aims to evolve beyond a memecoin into a full Solana-powered ecosystem driven by utility, innovation, and community.

COMMUNITY / SOCIAL LINKS
TikTok: @darkpinosolana — https://www.tiktok.com/@darkpinosolana
Twitter/X: @Pijucoin — https://x.com/Pijucoin
Telegram: https://t.me/+YMtd6vXpxy41Yjlh
Instagram: @pijucoin — https://www.instagram.com/pijucoin
Discord: https://discord.gg/Dcuf8fCyE

CONTACT / INVESTORS
Investor contact form is available on the website. Contact email: Samarisgeorge@gmail.com

FORMATTING RULES (CRITICAL)
NEVER use markdown formatting of any kind. Do NOT use asterisks, hashtags, bullet dashes, backticks, or numbered lists. Write in plain sentences and paragraphs only.';

$messages = [];
foreach ($history as $entry) {
    if (isset($entry['role'], $entry['content']) &&
        in_array($entry['role'], ['user', 'assistant'])) {
        $messages[] = [
            'role'    => $entry['role'],
            'content' => $entry['content'],
        ];
    }
}
$messages[] = ['role' => 'user', 'content' => $userMessage];

$payload = json_encode([
    'model'      => 'claude-haiku-4-5',
    'max_tokens' => 400,
    'system'     => $systemPrompt,
    'messages'   => $messages,
]);

if (!function_exists('curl_init')) {
    send_json(['error' => 'cURL is not enabled on this server. Enable it in Hostinger PHP settings.'], 500);
}

$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'x-api-key: ' . $apiKey,
        'anthropic-version: 2023-06-01',
    ],
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response  = curl_exec($ch);
$httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    send_json(['error' => 'Connection failed: ' . $curlError], 502);
}

$result = json_decode($response, true);

if ($httpCode !== 200) {
    $detail = isset($result['error']['message']) ? $result['error']['message'] : 'Unknown error';
    send_json(['error' => 'Anthropic API error (HTTP ' . $httpCode . '): ' . $detail], 502);
}

$reply = $result['content'][0]['text'] ?? 'Something went wrong, try again!';
send_json(['reply' => $reply]);
