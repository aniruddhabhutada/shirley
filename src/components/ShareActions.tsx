'use client';

import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import {
  Download,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
  HelpCircle,
  Loader2,
  X
} from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';

interface ShareActionsProps {
  fullName: string;
  firstName: string;
  memberNumber: number;
  referralCode: string;
  referralUrl: string;
}

export default function ShareActions({
  fullName,
  firstName,
  memberNumber,
  referralCode,
  referralUrl,
}: ShareActionsProps) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showIgGuide, setShowIgGuide] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Generate 1080x1920 PNG using HTML5 canvas directly as a fail-safe or html-to-image
  const generatePngBlob = async (): Promise<Blob | null> => {
    const exportNode = document.getElementById('shirley-story-export-card');

    // Method 1: html-to-image on the offscreen 1080x1920 node
    if (exportNode) {
      try {
        const dataUrl = await toPng(exportNode, {
          width: 1080,
          height: 1920,
          pixelRatio: 1,
          cacheBust: true,
        });
        const res = await fetch(dataUrl);
        return await res.blob();
      } catch (e) {
        console.warn('html-to-image failed, switching to canvas renderer:', e);
      }
    }

    // Method 2: High-definition direct HTML5 Canvas renderer (1080x1920)
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background: Soft Blush frame
    ctx.fillStyle = '#F8DDE5';
    ctx.fillRect(0, 0, 1080, 1920);

    // Inner Card: Rich Plum (#452039)
    const margin = 48;
    const cardX = margin;
    const cardY = margin;
    const cardW = 1080 - margin * 2;
    const cardH = 1920 - margin * 2 - 80;
    const radius = 56;

    ctx.fillStyle = '#452039';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, radius);
    ctx.fill();

    // Subtle card border
    ctx.strokeStyle = 'rgba(255, 240, 245, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Shirley Logo
    ctx.fillStyle = '#FFF9F5';
    ctx.font = '600 64px "Fraunces", Georgia, serif';
    ctx.fillText('Shirley', cardX + 72, cardY + 120);

    // Shirley 4-Petal Flower Emblem
    ctx.fillStyle = '#F8A5C2';
    const flowerX = cardX + 280;
    const flowerY = cardY + 100;
    // draw 4 subtle petal ellipses
    ctx.beginPath();
    ctx.ellipse(flowerX, flowerY - 12, 6, 14, 0, 0, Math.PI * 2);
    ctx.ellipse(flowerX + 12, flowerY, 14, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(flowerX, flowerY + 12, 6, 14, 0, 0, Math.PI * 2);
    ctx.ellipse(flowerX - 12, flowerY, 14, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Founding List Badge pill
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.roundRect(cardX + cardW - 320, cardY + 70, 248, 60, 30);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#FFE0D2';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('FOUNDING LIST', cardX + cardW - 196, cardY + 108);
    ctx.textAlign = 'left';

    // Headline
    ctx.fillStyle = '#FFF9F5';
    ctx.font = '500 84px "Fraunces", Georgia, serif';
    ctx.fillText("I'm on the list.", cardX + 72, cardY + 320);
    ctx.fillStyle = '#FFD65A';
    ctx.fillText('Are you?', cardX + 72, cardY + 410);

    // Subhead
    ctx.fillStyle = '#F8DDE5';
    ctx.font = '30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("A new era of women's wellness is coming.", cardX + 72, cardY + 480);
    ctx.fillText("And I'm getting first access.", cardX + 72, cardY + 524);

    // Membership Panel (Soft Blush)
    const panelY = cardY + 620;
    const panelH = 340;
    ctx.fillStyle = '#F8DDE5';
    ctx.beginPath();
    ctx.roundRect(cardX + 72, panelY, cardW - 144, panelH, 36);
    ctx.fill();

    ctx.fillStyle = '#65344F';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('MY SHIRLEY STATUS', cardX + 112, panelY + 60);

    const formattedNum = '#' + String(memberNumber).padStart(5, '0');
    ctx.textAlign = 'right';
    ctx.fillText(formattedNum, cardX + cardW - 112, panelY + 60);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#452039';
    ctx.font = 'bold 58px "Fraunces", Georgia, serif';
    ctx.fillText('FOUNDING MEMBER', cardX + 112, panelY + 140);

    ctx.fillStyle = '#C84B83';
    ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Issued to: ${fullName || firstName}`, cardX + 112, panelY + 200);

    ctx.fillStyle = 'rgba(69, 32, 57, 0.85)';
    ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Early access community · First drop pending', cardX + 112, panelY + 260);

    // Bottom section
    ctx.fillStyle = '#FFF9F5';
    ctx.font = '400 52px "Fraunces", Georgia, serif';
    ctx.fillText('Your wellness era starts here.', cardX + 72, cardY + 1200);

    // Divider line
    ctx.strokeStyle = 'rgba(248, 221, 229, 0.25)';
    ctx.beginPath();
    ctx.moveTo(cardX + 72, cardY + 1300);
    ctx.lineTo(cardX + cardW - 72, cardY + 1300);
    ctx.stroke();

    ctx.fillStyle = '#FFF9F5';
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SHIRLEY WELLNESS', cardX + 72, cardY + 1370);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#FFD65A';
    ctx.fillText('COMING SOON', cardX + cardW - 72, cardY + 1370);
    ctx.textAlign = 'left';

    // Outer frame footer text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#452039';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('YOUR INVITATION TO THE FIRST DROP', 540, 1850);
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`shirleywellness.com · Invitation #${referralCode}`, 540, 1885);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  };

  // Download 1080x1920 Story Card
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const blob = await generatePngBlob();
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SHIRLEY-Founding-Member-${referralCode}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  // Native Web Share API
  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        const shareData: ShareData = {
          title: "I'm on the SHIRLEY Founding List!",
          text: `A new era of women's wellness is coming to India. Join the free early-access community with me!`,
          url: referralUrl,
        };

        // Try to attach image if canShare supports files
        try {
          const blob = await generatePngBlob();
          if (blob && navigator.canShare) {
            const file = new File([blob], `SHIRLEY-Founding-Member-${referralCode}.png`, {
              type: 'image/png',
            });
            if (navigator.canShare({ files: [file] })) {
              shareData.files = [file];
            }
          }
        } catch {}

        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Native share failed, fallback to copy:', err);
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  // WhatsApp Share
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `I just joined the SHIRLEY Founding List! A new women's wellness brand is coming to India. Join the free early-access community and be part of the beginning:\n\n${referralUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Copy Referral Link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = referralUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto w-full">
      {/* Primary Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Download Story Card Button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          type="button"
          className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-shirley-plum-rich hover:bg-shirley-plum-deep text-white text-xs font-bold tracking-wider uppercase shadow-md transition-all duration-200 active:scale-[0.98] disabled:opacity-70"
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>EXPORTING 1080×1920...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-shirley-yellow-mango" />
              <span>DOWNLOAD STORY CARD</span>
            </>
          )}
        </button>

        {/* Share Button (Web Share or WhatsApp) */}
        <button
          onClick={handleNativeShare}
          type="button"
          className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs font-bold tracking-wider uppercase shadow-glow-yellow transition-all duration-200 active:scale-[0.98]"
        >
          <Share2 className="w-4 h-4" />
          <span>{shareSuccess ? 'SHARED!' : 'SHARE YOUR CARD'}</span>
        </button>
      </div>

      {/* Secondary Social Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* WhatsApp Share */}
        <button
          onClick={handleWhatsAppShare}
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-wider uppercase shadow-sm transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>SHARE ON WHATSAPP</span>
        </button>

        {/* Copy Referral Link */}
        <button
          onClick={handleCopyLink}
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-shirley-blush-light border border-shirley-blush-border text-shirley-plum-rich text-xs font-bold tracking-wider uppercase shadow-sm transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">LINK COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-shirley-berry-vibrant" />
              <span>COPY INVITATION LINK</span>
            </>
          )}
        </button>
      </div>

      {/* Instagram Story Sharing Guide Link */}
      <div className="pt-2 text-center">
        <button
          onClick={() => setShowIgGuide(true)}
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-shirley-berry-vibrant hover:underline"
        >
          <InstagramIcon className="w-3.5 h-3.5" />
          <span>How to share on Instagram Stories</span>
          <HelpCircle className="w-3 h-3 text-shirley-plum-dark/50" />
        </button>
      </div>

      {/* Instagram Guide Modal */}
      {showIgGuide && (
        <div className="fixed inset-0 z-50 bg-shirley-plum-dark/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-shirley-blush-border">
            <div className="flex items-center justify-between pb-3 border-b border-shirley-blush-border/40">
              <div className="flex items-center gap-2 text-shirley-berry-vibrant">
                <InstagramIcon className="w-5 h-5" />
                <h3 className="font-serif text-lg text-shirley-plum-rich font-medium">
                  Instagram Story Guide
                </h3>
              </div>
              <button
                onClick={() => setShowIgGuide(false)}
                className="p-1 rounded-full text-shirley-plum-dark/60 hover:bg-shirley-blush"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-shirley-plum-dark/85 leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-shirley-blush text-shirley-berry-vibrant font-bold flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <p>
                  Click <strong>&ldquo;DOWNLOAD STORY CARD&rdquo;</strong> to save the high-resolution 1080×1920 PNG to your device.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-shirley-blush text-shirley-berry-vibrant font-bold flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <p>
                  Open <strong>Instagram</strong>, swipe right to create a new Story, and select the saved card from your camera roll.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-shirley-blush text-shirley-berry-vibrant font-bold flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <p>
                  Use the <strong>Link Sticker</strong> in Instagram Stories and paste your personal referral URL so your friends can claim early access!
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowIgGuide(false)}
                className="w-full py-3 rounded-full bg-shirley-plum-rich text-white text-xs font-bold tracking-wider uppercase"
              >
                GOT IT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
