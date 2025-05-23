'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import LessonsList from './LessonsList';
import Tabs from './Tabs';
import ChattingTab from './ChattingTab';  // ChattingTab import qilindi
import { useParams } from 'next/navigation';

export default function LessonPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [moduleLessons, setModuleLessons] = useState([]);
  const [activeTab, setActiveTab] = useState('Q&A');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    // Hozircha mock ma'lumotlar bilan ishlaymiz
    setModuleLessons([
      { id: '1', title: '1-dars' },
      { id: '2', title: 'Lesson 2' },
      { id: '3', title: 'Lesson 3' },
    ]);
    setLesson({
      id,
      title: 'Revit Arxitektura kursiga kirish',
      videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE323an1wcJ6hfM2bxAtkdZsKwSvHSbHko7ip3riuu9iLgdgnCf&playbackInfo=eyJ2aWRlb0lkIjoiNmNhZGFlNTQ0ZGQ1NDU5MmFlNTE4NDRjMzMzYzlmZDEifQ==',
      moduleId: '1',
      qa: 'Ushbu dars kursga kirish darsi.',
      homework: 'Solve 5 practice problems.',
      resources: [
        { name: 'PDF Notes', url: '/docs/notes.pdf' },
        { name: 'Cheat Sheet PDF', url: 'https://example.com/cheatsheet.pdf' }
      ]
    });
    setLoading(false);
  }, [id]);

  if (loading) return <div className="mt-20 text-center text-white">Loading...</div>;
  if (!lesson) return <div className="mt-20 text-center text-white">Lesson not found.</div>;

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 py-8 lg:px-12">
      <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VideoPlayer title={lesson.title} videoUrl={lesson.videoUrl} />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} lesson={lesson} />

          <div className="mt-6" style={{ display: activeTab === 'Tavsif' ? 'block' : 'none' }}>
            <ChattingTab lessonId={lesson.id} />
          </div>
        </div>

        <LessonsList currentLessonId={lesson.id} moduleLessons={moduleLessons} moduleName="1-Modul" />
      </div>
    </div>
  );
}
