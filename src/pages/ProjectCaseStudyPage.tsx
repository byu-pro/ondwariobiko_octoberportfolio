import React from 'react';
import { PageRoute } from '../types';
import { responsiveImageSrcSet } from '../utils/images';
import { GlitchText } from '../components/GlitchText';
import { MoodsNMedWebShowcase, SoundCurvesWebShowcase } from '../components/SoundCurvesWebShowcase';

interface ProjectCaseStudyPageProps {
  base: string;
  slug: string;
  onNavigate: (route: PageRoute) => void;
}

interface CaseStudy {
  number: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  caseStudyThumbnail: string;
  image: string;
  links: [string, string][];
  context: string;
  challenge: string;
  response: string[];
  value: string;
}

// Obfuscated case study repository data (decrypted dynamically at runtime)
const _ENC_STORE = "eyJwZWxpY2FuLXNvY2lhbCI6eyJudW1iZXIiOiIwMSIsInRpdGxlIjoiUGVsaWNhbiBTb2NpYWwiLCJzdWJ0aXRsZSI6IkEgQ2FyaWJiZWFuIGJhciBhbmQgZ3JpbGwgaW4gU2ltcHNvbiBCYXksIFNpbnQgTWFhcnRlbi4iLCJjYXRlZ29yeSI6IkJyYW5kIGlkZW50aXR5IMK3IFJlc3RhdXJhbnQiLCJsb2NhdGlvbiI6IlNpbXBzb24gQmF5LCBTaW50IE1hYXJ0ZW4iLCJjYXNlU3R1ZHlUaHVtYm5haWwiOiJwZWxpY2Fuc29jaWFsbG9nb19jYXNlc3R1ZHl0aHVtYm5haWwud2VicCIsImltYWdlIjoicGVsaWNhbnNvY2lhbF90aHVtYm5haWxkZXNrdG9wLndlYnAiLCJsaW5rcyI6W1siUGVsaWNhbiBTb2NpYWwgd2Vic2l0ZSIsImh0dHBzOi8vcGVsaWNhbnNvY2lhbHN4bS5jb20vIl0sWyJNYWhvIEdyb3VwIHZlbnVlIHBhZ2UiLCJodHRwczovL21haG93aW5lYW5kZGluZS5jb20vdmVudWVzL3BlbGljYW4tc29jaWFsIl1dLCJjb250ZXh0IjoiUGVsaWNhbiBTb2NpYWwgaXMgYSBiYXIgYW5kIGdyaWxsIGluIFNpbXBzb24gQmF5LCBTaW50IE1hYXJ0ZW4sIHNlcnZpbmcgcmVzb3J0IHZpc2l0b3JzIGFuZCBsb2NhbCBndWVzdHMgaW4gYSBkZXN0aW5hdGlvbiBmdWxsIG9mIGRpbmluZyBjaG9pY2VzLiIsImNoYWxsZW5nZSI6IlRoZSBicmFuZCBuZWVkZWQgdG8gY29tbXVuaWNhdGUgYSB2YXJpZWQsIGZyZXNobHkgcHJlcGFyZWQgbWVudSBhbmQgYSByZWxheGVkIENhcmliYmVhbiBhdG1vc3BoZXJlLCB3aGlsZSBnaXZpbmcgdmlzaXRvcnMgYSBtZW1vcmFibGUgbmFtZSBhbmQgaWRlbnRpdHkgdG8gcmVjb2duaXplLiIsInJlc3BvbnNlIjpbIkNyZWF0ZWQgYSBjb21wbGV0ZSBsb2dvIGFuZCBicmFuZCBpZGVudGl0eSBkaXJlY3Rpb24gYXJvdW5kIHRoZSBQZWxpY2FuIFNvY2lhbCBuYW1lLiIsIkJhbGFuY2VkIGEgcG9saXNoZWQsIHdlbGNvbWluZyByZXN0YXVyYW50IGZlZWwgd2l0aCB0aGUgY2xpZW504oCZcyBib2hvLWNoaWMgQ2FyaWJiZWFuIHNldHRpbmcuIiwiRGVzaWduZWQgdGhlIGlkZW50aXR5IHRvIHdvcmsgYWNyb3NzIGRpZ2l0YWwgdG91Y2hwb2ludHMgYW5kIG9uLXByZW1pc2UgY3VzdG9tZXIgbWF0ZXJpYWxzLiJdLCJ2YWx1ZSI6IkEgZGlzdGluY3RpdmUgaWRlbnRpdHkgZ2l2ZXMgZ3Vlc3RzIGEgY2xlYXJlciBzZW5zZSBvZiB0aGUgZXhwZXJpZW5jZSBiZWZvcmUgdGhleSBhcnJpdmUgYW5kIGhlbHBzIHRoZSByZXN0YXVyYW50IHN0YW5kIGFwYXJ0IGluIGEgYnVzeSByZXNvcnQgZGVzdGluYXRpb24uIn0sImlrb24tdHJhaWxlcnMiOnsibnVtYmVyIjoiMDIiLCJ0aXRsZSI6IklLT04gVHJhaWxlcnMiLCJzdWJ0aXRsZSI6IkEgaGVhdnktZHV0eSB0cmFpbGVyIGRlYWxlciBzZXJ2aW5nIG93bmVyLW9wZXJhdG9ycyBhbmQgYnVzaW5lc3NlcyBpbiBTYW4gQW50b25pbywgVGV4YXMuIiwiY2F0ZWdvcnkiOiJCcmFuZCBpZGVudGl0eSDCtyBJbmR1c3RyaWFsIiwibG9jYXRpb24iOiJTYW4gQW50b25pbywgVGV4YXMsIFVTQSIsImNhc2VTdHVkeVRodW1ibmFpbCI6Imlrb250cmFpbGVyc2xvZ29fY2FzZXN0dWR5dGh1bWJuYWlsLndlYnAiLCJpbWFnZSI6Imlrb250cmFpbGVyc190aHVtYm5haWxsZGVza3RvcC53ZWJwIiwibGlua3MiOltbIklLT04gVHJhaWxlcnMgd2Vic2l0ZSIsImh0dHBzOi8vaWtvbnRyYWlsZXJzLmNvbS8iXV0sImNvbnRleHQiOiJJS09OIFRyYWlsZXJzIHNlbGxzIGhlYXZ5LWR1dHkgdHJhaWxlcnMgaW4gU2FuIEFudG9uaW8sIFRleGFzLCBzZXJ2aW5nIG93bmVyLW9wZXJhdG9ycyBhcyB3ZWxsIGFzIGxhcmdlIGNvcnBvcmF0ZSBidXllcnMgYWNyb3NzIHNldmVyYWwgdHJhaWxlciBjYXRlZ29yaWVzLiIsImNoYWxsZW5nZSI6IlRoZSBidXNpbmVzcyB3YW50ZWQgaXRzIGlkZW50aXR5IHRvIGV4cHJlc3MgdGhlIHN0cmVuZ3RoIGFuZCBoaWdoIHN0YW5kYXJkcyBiZWhpbmQgdGhlIElLT04gbmFtZSwgd2hpbGUgZWFybmluZyBjb25maWRlbmNlIGZyb20gYnV5ZXJzIHdpdGggdmVyeSBkaWZmZXJlbnQgb3BlcmF0aW5nIHNjYWxlcy4iLCJyZXNwb25zZSI6WyJEZXZlbG9wZWQgYSBsb2dvIGFuZCBicmFuZCBpZGVudGl0eSBmb3IgYSBoZWF2eS1kdXR5IHRyYWlsZXIgZGVhbGVyLiIsIlVzZWQgYSBzdHJvbmcsIGFzc3VyZWQgdmlzdWFsIGNoYXJhY3RlciBzdWl0ZWQgdG8gYW4gaW5kdXN0cmlhbCBzYWxlcyBlbnZpcm9ubWVudC4iLCJLZXB0IHRoZSBpZGVudGl0eSBmb2N1c2VkIG9uIHRoZSBJS09OIG5hbWUgYW5kIHRoZSBxdWFsaXR5IG9mIHRoZSBzZXJ2aWNlIGl0IHJlcHJlc2VudHMuIl0sInZhbHVlIjoiQSBjbGVhciwgcHJvZmVzc2lvbmFsIGlkZW50aXR5IGhlbHBzIHRoZSBidXNpbmVzcyBwcmVzZW50IGl0c2VsZiBjb25zaXN0ZW50bHkgdG8gaW5kaXZpZHVhbCBvcGVyYXRvcnMgYW5kIGVudGVycHJpc2UgYnV5ZXJzLCBzdXBwb3J0aW5nIHRydXN0IGF0IHRoZSBzdGFydCBvZiBhIGNvbnNpZGVyZWQgcHVyY2hhc2UuIn0sImlyb24tYWNyZSI6eyJudW1iZXIiOiIwMyIsInRpdGxlIjoiSXJvbiBBY3JlIExhbmQgQ28iLCJzdWJ0aXRsZSI6IkFuIGV4Y2F2YXRpb24gYW5kIGxhbmQgbWFuYWdlbWVudCBjb21wYW55IHNlcnZpbmcgbGFuZG93bmVycyBhbmQgaG9tZW93bmVycy4iLCJjYXRlZ29yeSI6IkJyYW5kIGlkZW50aXR5IMK3IENvbnN0cnVjdGlvbiIsImxvY2F0aW9uIjoiVW5pdGVkIFN0YXRlcyIsImNhc2VTdHVkeVRodW1ibmFpbCI6Imlyb25hY3JlbG9nb19jYXNlc3R1ZHl0aHVtYm5haWwud2VicCIsImltYWdlIjoiaXJvbmFjcmVfdGh1bWJuYWlsZGVza3RvcC53ZWJwIiwibGlua3MiOltbIklyb24gQWNyZSBMYW5kIENvIHdlYnNpdGUiLCJodHRwczovL3d3dy5pcm9uYWNyZWxhbmRjby5jb20vIl1dLCJjb250ZXh0IjoiSXJvbiBBY3JlIExhbmQgQ28gcHJvdmlkZXMgZXhjYXZhdGlvbiBhbmQgbGFuZCBtYW5hZ2VtZW50IGZvciBsYW5kb3duZXJzIGFuZCBob21lb3duZXJzLCB3aXRoIHdvcmsgc3Bhbm5pbmcgbGFuZCwgZXF1aW5lLCBhbmQgY29udHJhY3RvciBzZXR0aW5ncy4iLCJjaGFsbGVuZ2UiOiJUaGUgbG9nbyBuZWVkZWQgdG8gZmVlbCB0b3VnaCBhbmQgdW5jb21wbGljYXRlZCwgcmVwcm9kdWNlIGNsZWFybHkgb24gdHJ1Y2tzLCBtYWNoaW5lcnksIHdvcmt3ZWFyLCBhbmQgaGF0cywgYW5kIGF2b2lkIG5hcnJvd2luZyB0aGUgY29tcGFueSB0byBvbmx5IGEgZmFybSBvciBob3JzZSBhdWRpZW5jZS4iLCJyZXNwb25zZSI6WyJCdWlsdCB0aGUgaWRlbnRpdHkgYXJvdW5kIHRoZSBmdWxsIElyb24gQWNyZSBMYW5kIENvIG5hbWUuIiwiS2VwdCB0aGUgdmlzdWFsIGRpcmVjdGlvbiBzaW1wbGUsIHN0cm9uZywgYW5kIGdyb3VuZGVkIGluIHRoZSBjbGllbnTigJlzIGJsYWNrLWFuZC13aGl0ZSBwcmVmZXJlbmNlLiIsIkRlc2lnbmVkIGZvciBwcmFjdGljYWwgcmVjb2duaXRpb24gYWNyb3NzIHZlaGljbGVzLCBlcXVpcG1lbnQsIGNsb3RoaW5nLCBhbmQgc21hbGwtZm9ybWF0IHVzZXMuIl0sInZhbHVlIjoiQSB2ZXJzYXRpbGUgaWRlbnRpdHkgbWFrZXMgaXQgZWFzaWVyIGZvciBjdXN0b21lcnMgYW5kIHBhcnRuZXJzIHRvIHJlY29nbml6ZSB0aGUgY29tcGFueSB3aGVyZXZlciB0aGUgd29yayBoYXBwZW5zLCBmcm9tIGEgam9iIHNpdGUgdG8gYSBmaXJzdCBjb252ZXJzYXRpb24uIn0sImZyaWVuZHMtb2YtdW5pb252aWxsZSI6eyJudW1iZXIiOiIwNCIsInRpdGxlIjoiRnJpZW5kcyBvZiBVbmlvbnZpbGxlIiwic3VidGl0bGUiOiJBIG5vbnByb2ZpdCBjYXJpbmcgZm9yIHRoZSBoaXN0b3JpYyB2aWxsYWdlIG9mIFVuaW9udmlsbGUsIFBlbm5zeWx2YW5pYSwgaW4gcGFydG5lcnNoaXAgd2l0aCBpdHMgY29tbXVuaXR5LiIsImNhdGVnb3J5IjoiQnJhbmQgaWRlbnRpdHkgwrcgTm9uLXByb2ZpdCIsImxvY2F0aW9uIjoiVW5pb252aWxsZSwgUGVubnN5bHZhbmlhLCBVU0EiLCJjYXNlU3R1ZHlUaHVtYm5haWwiOiJmcmllbmRzb2Z1bmlvbnZpbGxlbG9nb19jYXNlc3R1ZHl0aHVtYm5haWwud2VicCIsImltYWdlIjoiZnJpZW5kc29mdW5pb252aWxsZV9kZXNrdG9wdGh1bWJuYWlsLndlYnAiLCJsaW5rcyI6W1siRnJpZW5kcyBvZiBVbmlvbnZpbGxlIHdlYnNpdGUiLCJodHRwczovL3d3dy5mcmllbmRzb2Z1bmlvbnZpbGxlLm9yZy8iXV0sImNvbnRleHQiOiJGcmllbmRzIG9mIFVuaW9udmlsbGUgaXMgYSBuZXcgbm9uLXByb2ZpdCB3b3JraW5nIHdpdGggcmVzaWRlbnRzLCBsb2NhbCBidXNpbmVzc2VzLCBhbmQgc3Rha2Vob2xkZXJzIHRvIHN0ZXdhcmQgYSBoaXN0b3JpYyB2aWxsYWdlIGFuZCBpdHMgcHVibGljIHNwYWNlcy4iLCJjaGFsbGVuZ2UiOiJBcyBhIG5ldyBvcmdhbml6YXRpb24sIGl0IG5lZWRlZCBhIHJlY29nbml6YWJsZSBpZGVudGl0eSB0aGF0IGNvdWxkIGV4cHJlc3MgaGVyaXRhZ2UsIGNvbm5lY3Rpb24sIHdhbGthYmlsaXR5LCBhbmQgY2FyZSBmb3IgdGhlIHZpbGxhZ2XigJlzIGZ1dHVyZSB3aXRob3V0IGJsZW5kaW5nIGludG8gbG9jYWwgb3JnYW5pemF0aW9ucyBhbHJlYWR5IHVzaW5nIGJsdWUuIiwicmVzcG9uc2UiOlsiQ3JlYXRlZCBhIGxvZ28gZGlyZWN0aW9uIGZvciB0aGUgRnJpZW5kcyBvZiBVbmlvbnZpbGxlIG5hbWUgYW5kIOKAnEVzdC4gMjAyNeKAnSBkZXRhaWwuIiwiRXhwbG9yZWQgYSBtYXR1cmUsIHNvcGhpc3RpY2F0ZWQgdmlzdWFsIHN0eWxlIHVzaW5nIGdyZWVucywgcmVkcywgYW5kIG90aGVyIHN1aXRhYmxlIGNvbG9ycy4iLCJDb25uZWN0ZWQgdGhlIGlkZW50aXR5IHRvIHRoZSB2aWxsYWdl4oCZcyBjcm9zc3JvYWRzLCBoaXN0b3JpYyBjaGFyYWN0ZXIsIGFuZCBjb2xsYWJvcmF0aXZlIG1pc3Npb24uIl0sInZhbHVlIjoiQSBjbGVhciBpZGVudGl0eSBnaXZlcyB0aGUgb3JnYW5pemF0aW9uIGEgY29uc2lzdGVudCB3YXkgdG8gaW50cm9kdWNlIGl0cyBtaXNzaW9uLCBidWlsZCByZWNvZ25pdGlvbiwgYW5kIGJyaW5nIGNvbW11bml0eSBpbml0aWF0aXZlcyB1bmRlciBvbmUgc2hhcmVkIGJhbm5lci4ifSwic291bmQtY3VydmVzIjp7Im51bWJlciI6IjA1IiwidGl0bGUiOiJTb3VuZEN1cnZlcyIsInN1YnRpdGxlIjoiQSBwcmVtaXVtIGVhcnBob25lIGJyYW5kIGZvciBhdWRpbyBlbnRodXNpYXN0cyBhbmQgcGVvcGxlIGV4cGxvcmluZyBoaWdoLWVuZCBzb3VuZC4iLCJjYXRlZ29yeSI6IldlYnNpdGUgZGVzaWduIMK3IENvbnN1bWVyIHRlY2hub2xvZ3kiLCJsb2NhdGlvbiI6IkNsaWVudCBsb2NhdGlvbiBub3Qgc3BlY2lmaWVkIiwiY2FzZVN0dWR5VGh1bWJuYWlsIjoicWJ5c291bmRjdXJ2ZXNsb2dvX2Nhc2VzdHVkeXRodW1ibmFpbC53ZWJwIiwiaW1hZ2UiOiJzb3VuZGN1cnZlc190aHVtYm5haWxkZXNrdG9wLndlYnAiLCJsaW5rcyI6W10sImNvbnRleHQiOiJTb3VuZEN1cnZlcyBzZWxscyBwcmVtaXVtIGVhcnBob25lcyBwcmljZWQgYXQgJDc5OSB0byB0d28gZ3JvdXBzOiBleHBlcmllbmNlZCBhdWRpbyBlbnRodXNpYXN0cyBhbmQgcGVvcGxlIHdobyBoYXZlIG5vdCB5ZXQgdHJpZWQgcHJlbWl1bSBhdWRpby4iLCJjaGFsbGVuZ2UiOiJUaGUgd2Vic2l0ZSBuZWVkZWQgdG8gc2VydmUgYm90aCBhdWRpZW5jZXM6IGdpdmUga25vd2xlZGdlYWJsZSBidXllcnMgdGhlIHByb2R1Y3QgYW5kIHRlY2hub2xvZ3kgZGV0YWlsIHRoZXkgZXhwZWN0LCB3aGlsZSBoZWxwaW5nIG5ld2NvbWVycyB1bmRlcnN0YW5kIHdoeSB0aGUgbGlzdGVuaW5nIGV4cGVyaWVuY2UgbWVyaXRzIHRoZSBpbnZlc3RtZW50LiIsInJlc3BvbnNlIjpbIkRlc2lnbmVkIGEgZm91ci1wYWdlIHdlYnNpdGUgd2l0aCBob21lLCBwcm9kdWN0LCB0ZWNobm9sb2d5LCBhbmQgb25lIGNhbXBhaWduIGxhbmRpbmcgcGFnZS4iLCJPcmdhbml6ZWQgbmF2aWdhdGlvbiBhbmQgcGFnZSBjb250ZW50IGFyb3VuZCBwcm9kdWN0IGRpc2NvdmVyeSwgZWR1Y2F0aW9uLCBhbmQgY2xlYXIgbmV4dCBzdGVwcy4iLCJEZXNpZ25lZCBkZXNrdG9wIGFuZCBtb2JpbGUgbGF5b3V0cyB0byBzdXBwb3J0IGJvdGggY29tcGFyaXNvbi1taW5kZWQgdmlzaXRvcnMgYW5kIGZpcnN0LXRpbWUgcHJlbWl1bSBidXllcnMuIl0sInZhbHVlIjoiQSB3ZWxsLXN0cnVjdHVyZWQgcHJvZHVjdCBleHBlcmllbmNlIGNhbiBtYWtlIGEgaGlnaC1jb25zaWRlcmF0aW9uIG9mZmVyIGVhc2llciB0byBldmFsdWF0ZSwgZXhwbGFpbiBwcm9kdWN0IHZhbHVlIGNsZWFybHksIGFuZCBndWlkZSBpbnRlcmVzdGVkIHZpc2l0b3JzIHRvd2FyZCBhIHB1cmNoYXNlIGRlY2lzaW9uLiJ9LCJtb29kcy1hbmQtbmVyZHMiOnsibnVtYmVyIjoiMDYiLCJ0aXRsZSI6Ik1vb2RzIE4gTWVkcyIsInN1YnRpdGxlIjoiQSBkaWdpdGFsIHdlbGxuZXNzIGNvbmNlcHQgZm9yIGFueGlldHkgc3VwcG9ydCwgbW9vZCB0cmFja2luZywgYW5kIG1lZGljYXRpb24gcmV2aWV3cy4iLCJjYXRlZ29yeSI6IldlYnNpdGUgZGVzaWduIMK3IERpZ2l0YWwgd2VsbG5lc3MiLCJsb2NhdGlvbiI6IkNsaWVudCBsb2NhdGlvbiBub3Qgc3BlY2lmaWVkIiwiY2FzZVN0dWR5VGh1bWJuYWlsIjoibW9vZHNubWVkc2xsb2dvX2Nhc2VzdHVkeXRodW1ibmFpbC53ZWJwIiwiaW1hZ2UiOiJtb29kbm1lZHNfdGh1bWJuYWlsZGVza3RvcC53ZWJwIiwibGlua3MiOltdLCJjb250ZXh0IjoiTW9vZHMgTiBNZWRzIGlzIGEgZGlnaXRhbCB3ZWxsbmVzcyBjb25jZXB0IGZvciBwZW9wbGUgZXhwZXJpZW5jaW5nIGFueGlldHksIGNvbWJpbmluZyBjYWxtaW5nIGNvbnRlbnQgd2l0aCB0b29scyBmb3IgZGFpbHkgbW9vZCBsb2dnaW5nIGFuZCBtZWRpY2F0aW9uIHJldmlld3MuIiwiY2hhbGxlbmdlIjoiVGhlIGV4cGVyaWVuY2UgbmVlZGVkIHRvIGZlZWwgdmlicmFudCB5ZXQgY2FsbSBhbmQgbWFrZSBzZXZlcmFsIHRhc2tzIGVhc3kgdG8gdW5kZXJzdGFuZDogZmluZGluZyByZWxpZWYgcmVzb3VyY2VzLCByZWNvcmRpbmcgYSBkYWlseSBtb29kLCB2aWV3aW5nIHBhc3QgbG9ncywgd3JpdGluZyBtZWRpY2F0aW9uIHJldmlld3MsIGFuZCBjcmVhdGluZyBhbiBhY2NvdW50LiIsInJlc3BvbnNlIjpbIkRlc2lnbmVkIGEgY29uc2lzdGVudCB2aXN1YWwgZGlyZWN0aW9uIGFjcm9zcyBmaXZlIHBhZ2VzOiBob21lLCBkYWlseSBsb2csIHJlc3VsdHMsIHJldmlld3MsIGFuZCBzaWduLXVwLiIsIlVzZWQgYSBjYWxtIHZpc3VhbCBhdG1vc3BoZXJlIGluZm9ybWVkIGJ5IHRoZSBjbGllbnTigJlzIGludGVyZXN0IGluIG5hdHVyZSBhbmQgSmFwYW5lc2UgZ2FyZGVuIHJlZmVyZW5jZXMuIiwiU3RydWN0dXJlZCB0aGUga2V5IGFjdGlvbnMgYW5kIGluZm9ybWF0aW9uIHNvIHVzZXJzIGNhbiB1bmRlcnN0YW5kIHdoYXQgZWFjaCBwYWdlIGlzIGZvci4iXSwidmFsdWUiOiJBIHRob3VnaHRmdWwgaW50ZXJmYWNlIGhlbHBzIHRoZSBzZXJ2aWNlIGNvbW11bmljYXRlIGl0cyBwdXJwb3NlIGFuZCBtYWtlcyBpdHMgdG9vbHMgZWFzaWVyIHRvIG5hdmlnYXRlLiBJdCBzdXBwb3J0cyB0aGUgcHJvZHVjdCBleHBlcmllbmNlIHdpdGhvdXQgcHJvbWlzaW5nIGEgbWVkaWNhbCBvdXRjb21lLiJ9LCJhcXVhcGV0LWtlbnlhIjp7Im51bWJlciI6IjA3IiwidGl0bGUiOiJBcXVhcGV0IEtlbnlhIiwic3VidGl0bGUiOiJBIHByZW1pZXIgcGV0IGNhcmUsIG51dHJpdGlvbiwgYW5kIGFxdWF0aWMgc3VwcGxpZXIgc2VydmluZyBwZXQgb3duZXJzIGFjcm9zcyBLZW55YSBzaW5jZSAxOTg0LiIsImNhdGVnb3J5IjoiQnJhbmQgaWRlbnRpdHkgwrcgUGV0IGNhcmUgJiByZXRhaWwiLCJsb2NhdGlvbiI6Ik5haXJvYmksIEtlbnlhIiwiY2FzZVN0dWR5VGh1bWJuYWlsIjoiYXF1YXBldGxvZ29fY2FzZXN0dWR5dGh1bWJuYWlsLndlYnAiLCJpbWFnZSI6ImFxdWFwZXRfZGVza3RvcHRodW1ibmFpbC53ZWJwIiwibGlua3MiOltbIkFxdWFwZXQgS2VueWEgd2Vic2l0ZSIsImh0dHBzOi8vYXF1YXBldC5jby5rZS8iXV0sImNvbnRleHQiOiJBcXVhcGV0IEtlbnlhIGlzIGEgbGVhZGluZyBwZXQgY2FyZSwgY29tcGFuaW9uIGFuaW1hbCBudXRyaXRpb24sIGFuZCBhcXVhcml1bSBzcGVjaWFsaXN0IHdpdGggbXVsdGlwbGUgcmV0YWlsIGxvY2F0aW9ucyBhY3Jvc3MgTmFpcm9iaSwgcHJvdmlkaW5nIGhpZ2gtcXVhbGl0eSBwZXQgZm9vZHMsIGFjY2Vzc29yaWVzLCBhbmQgYXF1YXRpYyBzZXR1cHMuIiwiY2hhbGxlbmdlIjoiVGhlIGJyYW5kIG5lZWRlZCBhIG1vZGVybiwgYXBwcm9hY2hhYmxlLCBhbmQgZW5kdXJpbmcgdmlzdWFsIGlkZW50aXR5IHRoYXQgaG9ub3JzIG92ZXIgZm91ciBkZWNhZGVzIG9mIHRydXN0ZWQgaGVyaXRhZ2Ugd2hpbGUgYXBwZWFsaW5nIHRvIGEgbmV3IGdlbmVyYXRpb24gb2YgcGV0IHBhcmVudHMgYW5kIGFxdWFyaXVtIGhvYmJ5aXN0cy4iLCJyZXNwb25zZSI6WyJEZXNpZ25lZCBhIGNvbXByZWhlbnNpdmUgbG9nbyBhbmQgYnJhbmQgaWRlbnRpdHkgc3lzdGVtIGNlbGVicmF0aW5nIHBldCBjb21wYW5pb25zaGlwIGFuZCBhcXVhdGljIGxpZmUuIiwiRGV2ZWxvcGVkIGEgdmlicmFudCwgd2FybSBjb2xvciBwYWxldHRlIHRoYXQgY29tbWFuZHMgcHJlc2VuY2Ugb24gc3RvcmVmcm9udCBzaWduYWdlLCBwYWNrYWdpbmcsIGFuZCBkaWdpdGFsIHJldGFpbC4iLCJCdWlsdCBzY2FsYWJsZSBicmFuZCBndWlkZWxpbmVzIGFuZCBhc3NldCB0b3VjaHBvaW50cyBmb3IgcGh5c2ljYWwgcmV0YWlsIGJyYW5jaGVzIGFuZCBvbmxpbmUgZS1jb21tZXJjZS4iXSwidmFsdWUiOiJBIHJldml0YWxpemVkIGJyYW5kIGlkZW50aXR5IHJlaW5mb3JjZXMgQXF1YXBldCdzIHBvc2l0aW9uIGFzIEtlbnlh4oCZcyBwcmVtaWVyIHBldCBjYXJlIGF1dGhvcml0eSwgY3JlYXRpbmcgc3Ryb25nIGVtb3Rpb25hbCByZXNvbmFuY2Ugd2l0aCBjdXN0b21lcnMgYW5kIGNvbnNpc3RlbmN5IGFjcm9zcyByZXRhaWwgYnJhbmNoZXMuIn0sIm9jZWFuLWxpbmUtZnJlaWdodCI6eyJudW1iZXIiOiIwOCIsInRpdGxlIjoiT2NlYW4gTGluZSBGcmVpZ2h0IEZvcndhcmRlcnMiLCJzdWJ0aXRsZSI6IkFuIGludGVncmF0ZWQgbG9naXN0aWNzIGFuZCBmcmVpZ2h0IGZvcndhcmRpbmcgbGVhZGVyIHByb3ZpZGluZyBzZWEsIGFpciwgYW5kIG92ZXJsYW5kIGNhcmdvIHNvbHV0aW9ucyBhY3Jvc3MgRWFzdCBBZnJpY2EuIiwiY2F0ZWdvcnkiOiJCcmFuZCBpZGVudGl0eSDCtyBMb2dpc3RpY3MgJiBmcmVpZ2h0IGZvcndhcmRpbmciLCJsb2NhdGlvbiI6Ik5haXJvYmkgJiBNb21iYXNhLCBLZW55YSIsImNhc2VTdHVkeVRodW1ibmFpbCI6Im9jZWFubGluZWxvZ29fY2FzZXN0dWR5dGh1bWJuYWlsLndlYnAiLCJpbWFnZSI6Im9jZWFubGluZV9kZXNrdG9wdGh1bWJuYWlsLndlYnAiLCJsaW5rcyI6W1siT2NlYW4gTGluZSBGcmVpZ2h0IEZvcndhcmRlcnMgd2Vic2l0ZSIsImh0dHBzOi8vb2NlYW5saW5lZnJlaWdodC5jb20vIl1dLCJjb250ZXh0IjoiT2NlYW4tTGluZSBGcmVpZ2h0IEZvcndhcmRlcnMgTGltaXRlZCBpcyBhbiBhY2NyZWRpdGVkIGxvZ2lzdGljcyBwYXJ0bmVyIHdpdGggb3ZlciB0d28gZGVjYWRlcyBvZiBleHBlcmllbmNlLCBtYW5hZ2luZyBjb21wbGV4IGN1c3RvbXMgY2xlYXJhbmNlLCB3YXJlaG91c2luZywgYW5kIG11bHRpLW1vZGFsIHRyYW5zcG9ydCB0aHJvdWdob3V0IEVhc3QgQWZyaWNhIGFuZCBnbG9iYWxseS4iLCJjaGFsbGVuZ2UiOiJUaGUgbG9naXN0aWNzIGFuZCBmcmVpZ2h0IHNlY3RvciByZXF1aXJlcyBhbiBpbW1lZGlhdGUgc2Vuc2Ugb2YgcmVsaWFiaWxpdHksIHNwZWVkLCBhbmQgaW5zdGl0dXRpb25hbCB0cnVzdC4gVGhlIGJyYW5kIHJlcXVpcmVkIGEgcG93ZXJmdWwgY29ycG9yYXRlIHZpc3VhbCBzeXN0ZW0gY2FwYWJsZSBvZiB3b3JraW5nIGFjcm9zcyBjb250YWluZXIgZmxlZXRzLCBoZWF2eSB0cmFuc3BvcnQsIGRvY3VtZW50YXRpb24sIGFuZCBkaWdpdGFsIGNoYW5uZWxzLiIsInJlc3BvbnNlIjpbIkNyYWZ0ZWQgYSBib2xkLCBhdXRob3JpdGF0aXZlIGxvZ28gYW5kIHZpc3VhbCBpZGVudGl0eSBjZW50ZXJlZCBvbiBnbG9iYWwgbW92ZW1lbnQgYW5kIG1hcml0aW1lIGNvbm5lY3Rpdml0eS4iLCJFbmdpbmVlcmVkIGEgaGlnaC1jb250cmFzdCBjb3Jwb3JhdGUgcGFsZXR0ZSB1c2luZyBtYXJpdGltZSBuYXZ5LCBjcmlzcCB3aGl0ZSwgYW5kIGR5bmFtaWMgY3JpbXNvbiBhY2NlbnRzLiIsIkRlc2lnbmVkIGNvbXByZWhlbnNpdmUgYXBwbGljYXRpb24gc3lzdGVtcyBmb3IgdmVoaWNsZSBmbGVldHMsIHNoaXBwaW5nIGNvbnRhaW5lcnMsIGNvcnBvcmF0ZSBjb21tdW5pY2F0aW9ucywgYW5kIGRpZ2l0YWwgcGxhdGZvcm1zLiJdLCJ2YWx1ZSI6IkEgY29tbWFuZGluZyBjb3Jwb3JhdGUgaWRlbnRpdHkgcHJvamVjdHMgaW50ZXJuYXRpb25hbCBjcmVkaWJpbGl0eSBhbmQgb3BlcmF0aW9uYWwgcmlnb3IsIGhlbHBpbmcgT2NlYW4gTGluZSBlc3RhYmxpc2ggaW1tZWRpYXRlIGNvbmZpZGVuY2Ugd2l0aCBlbnRlcnByaXNlIHNoaXBwZXJzLCBjdXN0b21zIGF1dGhvcml0aWVzLCBhbmQgZ2xvYmFsIGZyZWlnaHQgcGFydG5lcnMuIn0sImdyZWVuLWVzc2VudGlhbCI6eyJudW1iZXIiOiIwOSIsInRpdGxlIjoiR3JlZW4gRXNzZW50aWFscyIsInN1YnRpdGxlIjoiQSBob21lIHNlcnZpY2VzIGNvbXBhbnkgb2ZmZXJpbmcgbGF3biBmZXJ0aWxpemF0aW9uLCB3ZWVkIGNvbnRyb2wsIGFuZCBtb3NxdWl0byB0cmVhdG1lbnRzLiIsImNhdGVnb3J5IjoiTG9nbyBkZXNpZ24gwrcgSG9tZSBzZXJ2aWNlcyIsImxvY2F0aW9uIjoiTG9nYW52aWxsZSwgR2VvcmdpYSwgVVNBIiwiY2FzZVN0dWR5VGh1bWJuYWlsIjoiZ3JlZW5lc3NlbnRpYWxzbG9nb19jYXNlc3R1ZHl0aHVtYm5haWwud2VicCIsImltYWdlIjoiZ3JlZW5lc3NlbnRpYWxfdGh1bWJuYWlsZGVza3RvcC53ZWJwIiwibGlua3MiOltbIkdyZWVuIEVzc2VudGlhbHMgd2Vic2l0ZSIsImh0dHBzOi8vd3d3LmdyZWVuZXNzZW50aWFscy5pbmZvLyJdLFsiR3JlZW4gRXNzZW50aWFscyBwcm9maWxlIiwiaHR0cHM6Ly93d3cuYWxpZ25hYmxlLmNvbS9sb2dhbnZpbGxlLWdhL2dyZWVuLWVzc2VudGlhbHMtbGF3bi1zZXJ2aWNlIl1dLCJjb250ZXh0IjoiR3JlZW4gRXNzZW50aWFscyBvZmZlcnMgbGF3biBmZXJ0aWxpemF0aW9uLCB3ZWVkIGNvbnRyb2wsIGFuZCBtb3NxdWl0byB0cmVhdG1lbnRzIHRvIHBlb3BsZSB3aG8gd2FudCBhIGhlYWx0aGllciBsYXduIGFuZCBhIG1vcmUgY29tZm9ydGFibGUgeWFyZC4iLCJjaGFsbGVuZ2UiOiJUaGUgbG9nbyBuZWVkZWQgdG8gbWFrZSB0d28gcmVsYXRlZCBzZXJ2aWNlc+KAlGxhd24gY2FyZSBhbmQgbW9zcXVpdG8gY29udHJvbOKAlGNsZWFyIHRvIGhvbWVvd25lcnMgYXQgYSBnbGFuY2UuIiwicmVzcG9uc2UiOlsiRGV2ZWxvcGVkIGEgbG9nbyBkaXJlY3Rpb24gZm9yIHRoZSBHcmVlbiBFc3NlbnRpYWxzIG5hbWUuIiwiQnJvdWdodCB0aGUgbGF3biBhbmQgbW9zcXVpdG8gc2VydmljZSBjdWVzIHRvZ2V0aGVyIGluIG9uZSB2aXN1YWwgaWRlbnRpdHkuIiwiRXhwbG9yZWQgYSBibHVlLWFuZC1ncmVlbiBwYWxldHRlIHN1aXRlZCB0byB0aGUgZW52aXJvbm1lbnRhbCBhbmQgb3V0ZG9vciBzZXJ2aWNlIGNhdGVnb3J5LiJdLCJ2YWx1ZSI6IkNsZWFyIHNlcnZpY2UgY3VlcyBjYW4gaGVscCBob21lb3duZXJzIHF1aWNrbHkgdW5kZXJzdGFuZCB3aGF0IHRoZSBidXNpbmVzcyBvZmZlcnMgYW5kIHJlbWVtYmVyIGl0IHdoZW4gdGhleSBhcmUgcmVhZHkgdG8gaW1wcm92ZSB0aGVpciBvdXRkb29yIHNwYWNlLiJ9LCJsZXdpcy1wYXJrIjp7Im51bWJlciI6IjEwIiwidGl0bGUiOiJMZXdpcyBQYXJrIFBpY2tsZWJhbGwiLCJzdWJ0aXRsZSI6IkEgbmVpZ2hib3Job29kIHBpY2tsZWJhbGwgZ3JvdXAgYnJpbmdpbmcgbG9jYWwgcGxheWVycyB0b2dldGhlciBpbiBTYWNyYW1lbnRvLCBDYWxpZm9ybmlhLiIsImNhdGVnb3J5IjoiQXBwYXJlbCBkZXNpZ24gwrcgQ29tbXVuaXR5IiwibG9jYXRpb24iOiJTYWNyYW1lbnRvLCBDYWxpZm9ybmlhLCBVU0EiLCJjYXNlU3R1ZHlUaHVtYm5haWwiOiJsZXdpc3Bhcmtsb2dvX2Nhc2VzdHVkeXRodW1ibmFpbC53ZWJwIiwiaW1hZ2UiOiJsZXdpc3BhcmtfdGh1bWJuYWlsZGVza3RvcC53ZWJwIiwibGlua3MiOltdLCJjb250ZXh0IjoiQSBkaXZlcnNlIGdyb3VwIG9mIGFkdWx0cyBwbGF5cyBwaWNrbGViYWxsIHJlZ3VsYXJseSBhdCBMZXdpcyBQYXJrIGluIFNhY3JhbWVudG8sIENhbGlmb3JuaWEsIGJyaW5naW5nIG5laWdoYm9ycyB0b2dldGhlciBmb3IgZnJpZW5kc2hpcCBhbmQgZXhlcmNpc2UuIiwiY2hhbGxlbmdlIjoiVGhlIHNoaXJ0IGdyYXBoaWMgbmVlZGVkIHRvIGFwcGVhbCBhY3Jvc3MgZ2VuZGVycyBhbmQgYWdlcywgcmVhZCBjbGVhcmx5IGluIGdyb3VwIHBob3RvcywgYW5kIGdpdmUgTGV3aXMgUGFyayBncmVhdGVyIHByb21pbmVuY2UgdGhhbiB0aGUgY2l0eSBsaW5lLiIsInJlc3BvbnNlIjpbIkNyZWF0ZWQgYSB0d28tY29sb3IgZGVzaWduIGZvciBuYXZ5IHNoaXJ0cyB1c2luZyB3aGl0ZSBhbmQgbmVvbiBncmVlbi4iLCJNYWRlIOKAnExld2lzIFBhcmvigJ0gdGhlIHByaW1hcnkgbWVzc2FnZSwgd2l0aCDigJxTYWNyYW1lbnRvLCBDYWxpZm9ybmlh4oCdIGluIGEgc3VwcG9ydGluZyByb2xlLiIsIkRlc2lnbmVkIHRoZSBncmFwaGljIGZvciBlYXN5IHJlYWRpbmcgYW5kIGEgc2hhcmVkIHNlbnNlIG9mIGdyb3VwIGlkZW50aXR5LiJdLCJ2YWx1ZSI6IkEgcmVjb2duaXphYmxlIGdyb3VwIHNoaXJ0IGhlbHBzIHBhcnRpY2lwYW50cyBmZWVsIGNvbm5lY3RlZCBhbmQgbWFrZXMgdGhlIHBhcmsgY29tbXVuaXR5IGVhc2llciB0byBpZGVudGlmeSBpbiBwaG90b3MgYW5kIGF0IGxvY2FsIGV2ZW50cy4ifX0=";

function _decodeRepositoryData<T>(rawBase64: string): T {
  try {
    if (typeof window !== "undefined" && typeof window.atob === "function") {
      const bin = window.atob(rawBase64);
      const uint8 = Uint8Array.from(bin, (c) => c.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(uint8));
    }
  } catch {
    // Graceful fallback
  }
  return {} as T;
}

const caseStudies: Record<string, CaseStudy> = _decodeRepositoryData<Record<string, CaseStudy>>(_ENC_STORE);

const brandProjectVisuals: Record<string, { sketch: string; bw: string }> = {
  'pelican-social': {
    sketch: 'pelicansocialsketch.webp',
    bw: 'pelicansocialwhiteandblack.webp',
  },
  'ikon-trailers': {
    sketch: 'ikontrailerssketch.webp',
    bw: 'ikontrailersblackandwhite.webp',
  },
  'iron-acre': {
    sketch: 'ironacresketch.webp',
    bw: 'ironacreblackandwhite.webp',
  },
  'friends-of-unionville': {
    sketch: 'friendsofunionvillesketch-01.webp',
    bw: 'friendsofwhiteandblack-01.webp',
  },
  'aquapet-kenya': {
    sketch: 'aquapetsketch.webp',
    bw: 'aquapetblackandwhite.webp',
  },
  'ocean-line-freight': {
    sketch: 'oceanlinesketch.webp',
    bw: 'oceanlineblackandwhite.webp',
  },
  'green-essential': {
    sketch: 'greenessentialssketch.webp',
    bw: 'greenessentialsblackandwhite.webp',
  },
};

interface BrandProjectMockups {
  m01?: string;
  m02?: string;
  m03?: string;
  m04?: string;
  m05?: string;
  m06?: string;
  m07?: string;
  m08?: string;
  m09?: string;
  m10?: string;
  m11?: string;
}

const brandProjectMockups: Record<string, BrandProjectMockups> = {
  'pelican-social': {},
  'ikon-trailers': {},
  'iron-acre': {},
  'friends-of-unionville': {},
  'aquapet-kenya': {},
  'ocean-line-freight': {},
  'green-essential': {},
};

function MockupSlot({
  slotNumber,
  type,
  imageSrc,
  projectTitle,
  base,
}: {
  slotNumber: number;
  type: 'full' | 'split-left' | 'split-right';
  imageSrc?: string;
  projectTitle: string;
  base: string;
}) {
  const isFull = type === 'full';
  const slotStr = slotNumber < 10 ? `0${slotNumber}` : `${slotNumber}`;
  const label = isFull
    ? `Mockup ${slotStr} · Full-Width Showcase`
    : type === 'split-left'
    ? `Mockup ${slotStr} · Left Split`
    : `Mockup ${slotStr} · Right Split`;

  if (imageSrc) {
    return (
      <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-black shadow-2xl">
        <img
          src={`${base}images/${imageSrc}`}
          srcSet={responsiveImageSrcSet(`${base}images/${imageSrc}`)}
          sizes={isFull ? '100vw' : '(min-width: 768px) 50vw, 100vw'}
          alt={`${projectTitle} mockup ${slotStr}`}
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl border border-dashed border-white/20 bg-[#0a0a0c] text-center flex flex-col items-center justify-center transition-colors hover:border-neon/40 group ${
        isFull
          ? 'p-8 sm:p-12 md:p-16 min-h-[280px] sm:min-h-[380px] md:min-h-[460px]'
          : 'p-6 sm:p-8 md:p-10 min-h-[240px] sm:min-h-[320px]'
      }`}
    >
      <div aria-hidden="true" className="absolute inset-0 hero-dot-grid-dark opacity-35 pointer-events-none" />
      <div className={`relative z-10 space-y-2.5 ${isFull ? 'max-w-xl' : 'max-w-sm'}`}>
        <span
          className={`inline-block px-3.5 py-1 rounded-full font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] ${
            isFull
              ? 'bg-neon/10 border border-neon/30 text-accent-ink'
              : 'bg-white/5 border border-white/15 text-accent-ink'
          }`}
        >
          {label}
        </span>
        <h3
          className={`font-display font-extrabold uppercase tracking-tight text-white ${
            isFull ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-2xl sm:text-3xl md:text-4xl'
          }`}
        >
          {isFull ? (
            <>
              2880 × 1620 <span className="text-neon text-2xl sm:text-3xl font-mono">px</span>
            </>
          ) : (
            <>
              1440 × 1080 <span className="text-neon text-xl sm:text-2xl font-mono">px</span>
            </>
          )}
        </h3>
        <p className="font-mono text-xs text-ink/70">
          {isFull
            ? 'Aspect Ratio 16:9 · Full container width (1400px @ 2x Retina)'
            : 'Aspect Ratio 4:3 (or 1:1 @ 1440 × 1440 px)'}
        </p>
        <p className="font-mono text-[10px] text-ink/40 pt-0.5">
          {isFull
            ? 'Standard 1x: 1920 × 1080 px | Best Sharpness (2x Retina): 2880 × 1620 px'
            : '2x Retina: 1440 × 1080 px | 16:9 option: 1920 × 1080 px'}
        </p>
      </div>
    </div>
  );
}

export function ProjectCaseStudyPage({ base, slug, onNavigate }: ProjectCaseStudyPageProps) {
  const project = caseStudies[slug as keyof typeof caseStudies];
  const brandVisuals = brandProjectVisuals[slug];
  const isBrandProject = Boolean(brandProjectVisuals[slug]);
  const mockups = brandProjectMockups[slug];
  const projectOrder = Object.entries(caseStudies);
  const currentIndex = projectOrder.findIndex(([projectSlug]) => projectSlug === slug);
  const [previousSlug, previousProject] = projectOrder[(currentIndex - 1 + projectOrder.length) % projectOrder.length];
  const [nextSlug, nextProject] = projectOrder[(currentIndex + 1) % projectOrder.length];
  if (!project) {
    return (
      <main className="relative w-full bg-black text-white px-5 md:px-8 pt-40 pb-24 min-h-[60vh] border-b border-white/15 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 hero-dot-grid-dark opacity-70 pointer-events-none z-0" />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 75% 65% at 78% 18%, rgba(217, 253, 23, 0.11) 0%, rgba(217, 253, 23, 0.03) 45%, rgba(0, 0, 0, 0) 75%)',
          }}
        />
        <div className="relative z-10 max-w-[1000px] mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-5">Project not found</p>
          <h1 className="font-display font-extrabold uppercase tracking-tighter text-5xl sm:text-7xl">
            Let’s find the right <span className="inline-block text-neon-gradient">work</span>
          </h1>
          <button onClick={() => onNavigate('work')} className="mt-8 rounded-full bg-neon px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">Back to selected work ↗</button>
        </div>
      </main>
    );
  }

  const isExtraLongTitle = project.title.length > 22 || project.title.split(/\s+/).length >= 4;
  const isMediumTitle = project.title.length > 12 || project.title.split(/\s+/).length >= 3;
  const titleSizeClass = isExtraLongTitle
    ? 'text-[clamp(1.75rem,5.5vw,4.5rem)] leading-[0.94] sm:leading-[0.9]'
    : isMediumTitle
    ? 'text-[clamp(2rem,6.8vw,5.5rem)] leading-[0.9] sm:leading-[0.86]'
    : 'text-[clamp(2.5rem,8vw,7rem)] leading-[0.86]';

  return (
    <main className="w-full overflow-x-hidden">
      <section className="relative w-full bg-black text-white px-5 md:px-8 pt-28 sm:pt-36 md:pt-48 pb-10 sm:pb-14 border-b border-white/15 overflow-hidden">
        {/* SUBTLE DARK STUDIO CANVAS DOT-GRID + AMBIENT LIME RADIAL GLOW */}
        <div aria-hidden="true" className="absolute inset-0 hero-dot-grid-dark opacity-70 pointer-events-none z-0" />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 75% 65% at 78% 18%, rgba(217, 253, 23, 0.11) 0%, rgba(217, 253, 23, 0.03) 45%, rgba(0, 0, 0, 0) 75%)',
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <button onClick={() => onNavigate('work')} className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink/55 hover:text-accent-ink transition-colors inline-flex items-center gap-1.5 py-1">← All projects</button>
          <div className="mt-8 sm:mt-12 md:mt-14 grid grid-cols-1 gap-6 sm:gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] xl:gap-14 items-start">
            <div className="min-w-0">
              <p className="mb-3 sm:mb-4 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink">{project.number} / {project.category}</p>
              <h1 className={`max-w-full break-words sm:break-normal text-balance font-display font-extrabold uppercase tracking-tighter ${titleSizeClass}`}>
                {project.title === 'SoundCurves' ? (
                  <>
                    <GlitchText text="Sound" variant="dark" delayMs={0} />
                    <wbr />
                    <GlitchText text="Curves" variant="dark" delayMs={80} className="text-neon-gradient" />
                  </>
                ) : (() => {
                  const parts = project.title.trim().split(/\s+/);
                  const last = parts.pop() ?? '';
                  const rest = parts.join(' ');
                  return (
                    <>
                      {rest ? (
                        <>
                          <GlitchText text={rest} variant="dark" delayMs={0} />{' '}
                        </>
                      ) : null}
                      <GlitchText text={last} variant="dark" delayMs={80} className="text-neon-gradient" />
                    </>
                  );
                })()}
              </h1>
              <p className="mt-3.5 sm:mt-4 max-w-3xl font-sans text-base sm:text-lg md:text-xl xl:text-2xl text-ink/75 leading-relaxed sm:leading-snug">{project.subtitle}</p>
            </div>
            <div className="min-w-0 xl:pt-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 mb-2 sm:mb-3">Project focus</p>
              <p className="max-w-[42ch] font-sans text-xs sm:text-sm md:text-base text-ink/70 leading-relaxed">Business challenge, creative response, and the value the work is designed to support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full pb-10 sm:pb-14 md:pb-16">
        <img src={`${base}images/${project.caseStudyThumbnail}`} srcSet={responsiveImageSrcSet(`${base}images/${project.caseStudyThumbnail}`)} sizes="100vw" alt={`${project.title} project thumbnail`} width={1920} height={960} loading="eager" fetchPriority="high" decoding="async" className="block h-auto w-full object-cover" />
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <aside className="mt-8 sm:mt-12 md:mt-14 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-7 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
            <div className="min-w-0"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink">Client</p><h2 className="mt-2 sm:mt-3 font-display uppercase font-bold text-xl sm:text-2xl md:text-3xl">{project.title}</h2><p className="mt-1.5 sm:mt-2 font-sans text-xs sm:text-sm text-ink/60">{project.location}</p></div>
            {project.links.length > 0 && <div className="flex flex-wrap gap-2.5 sm:gap-3">{project.links.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/20 px-4 py-2.5 sm:px-5 sm:py-3 font-mono text-[10px] uppercase tracking-[0.15em] hover:border-neon hover:text-accent-ink transition-all duration-300 hover:-translate-y-0.5">{label} ↗</a>)}</div>}
          </aside>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-12 sm:pb-20 md:pb-24">
        <div className="max-w-[1400px] mx-auto rounded-xl sm:rounded-2xl bg-neon text-black p-5 sm:p-8 md:p-12 lg:p-14 grid md:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="md:col-span-4"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/60 mb-2 sm:mb-3">Project scope</p><h2 className="font-display uppercase font-extrabold tracking-tight text-2xl sm:text-3xl md:text-4xl">What the client needed</h2></div>
          <div className="md:col-span-8"><p className="font-sans text-base sm:text-lg md:text-xl leading-relaxed">{project.challenge}</p><p className="mt-4 sm:mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-black/60">{project.category}</p></div>
        </div>
      </section>

      {/* BRAND EXPLORATION: CONCEPT SKETCHES (FULL-WIDTH ON MOBILE, CONTAINED ON DESKTOP) */}
      {brandVisuals?.sketch && (
        <section className="w-full pb-10 sm:pb-16 md:pb-20">
          <div className="max-w-[1400px] lg:max-w-[1080px] xl:max-w-[1140px] mx-auto px-5 md:px-8 mb-4 sm:mb-6">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink">
              Ideation &amp; Exploratory Sketches
            </p>
          </div>
          <div className="w-full lg:max-w-[1080px] xl:max-w-[1140px] mx-auto lg:px-8">
            <div className="w-full overflow-hidden bg-black lg:rounded-xl xl:rounded-2xl lg:border lg:border-white/10 lg:shadow-2xl">
              <img 
                src={`${base}images/${brandVisuals.sketch}`}
                srcSet={responsiveImageSrcSet(`${base}images/${brandVisuals.sketch}`)}
                sizes="(min-width: 1024px) 1140px, 100vw"
                alt={`${project.title} concept sketches`}
                loading="lazy"
                decoding="async"
                className="block w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* BRAND EXPLORATION: BLACK & WHITE IDENTITY MARK (FULL-WIDTH ON MOBILE, CONTAINED ON DESKTOP) */}
      {brandVisuals?.bw && (
        <section className="w-full pb-12 sm:pb-20 md:pb-24">
          <div className="max-w-[1400px] lg:max-w-[1080px] xl:max-w-[1140px] mx-auto px-5 md:px-8 mb-4 sm:mb-6">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink">
              Mark Development / Black &amp; White Execution
            </p>
          </div>
          <div className="w-full lg:max-w-[1080px] xl:max-w-[1140px] mx-auto lg:px-8">
            <div className="w-full overflow-hidden bg-black lg:rounded-xl xl:rounded-2xl lg:border lg:border-white/10 lg:shadow-2xl">
              <img 
                src={`${base}images/${brandVisuals.bw}`}
                srcSet={responsiveImageSrcSet(`${base}images/${brandVisuals.bw}`)}
                sizes="(min-width: 1024px) 1140px, 100vw"
                alt={`${project.title} black and white mark`}
                loading="lazy"
                decoding="async"
                className="block w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
      )}

      <section className="px-5 md:px-8 pb-12 sm:pb-20 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6 mb-5 sm:mb-7">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-2 sm:mb-3">Project imagery</p>
              <h2 className="font-display font-extrabold uppercase tracking-tighter text-2xl sm:text-3xl md:text-4xl">The work in detail</h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/40">
              {slug === 'sound-curves'
                ? 'High-Fidelity Audio Platform Compositions'
                : slug === 'moods-and-nerds'
                ? 'Desktop & Mobile Wellness Website Concepts'
                : isBrandProject
                ? 'Brand applications & physical mockups'
                : 'Identity system & visual execution'}
            </p>
          </div>

          {slug === 'sound-curves' ? (
            <SoundCurvesWebShowcase base={base} />
          ) : slug === 'moods-and-nerds' ? (
            <MoodsNMedWebShowcase base={base} />
          ) : isBrandProject ? (
            <div className="space-y-6 sm:space-y-8">
              {/* ROW 1: MOCKUP 01 (FULL WIDTH) */}
              <MockupSlot slotNumber={1} type="full" imageSrc={mockups?.m01} projectTitle={project.title} base={base} />

              {/* ROW 2: MOCKUPS 02 & 03 (SPLIT LEFT & RIGHT) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <MockupSlot slotNumber={2} type="split-left" imageSrc={mockups?.m02} projectTitle={project.title} base={base} />
                <MockupSlot slotNumber={3} type="split-right" imageSrc={mockups?.m03} projectTitle={project.title} base={base} />
              </div>

              {/* ROW 3: MOCKUP 04 (FULL WIDTH) */}
              <MockupSlot slotNumber={4} type="full" imageSrc={mockups?.m04} projectTitle={project.title} base={base} />

              {/* ROW 4: MOCKUPS 05 & 06 (SPLIT LEFT & RIGHT) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <MockupSlot slotNumber={5} type="split-left" imageSrc={mockups?.m05} projectTitle={project.title} base={base} />
                <MockupSlot slotNumber={6} type="split-right" imageSrc={mockups?.m06} projectTitle={project.title} base={base} />
              </div>

              {/* ROW 5: MOCKUP 07 (FULL WIDTH) */}
              <MockupSlot slotNumber={7} type="full" imageSrc={mockups?.m07} projectTitle={project.title} base={base} />

              {/* ROW 6: MOCKUPS 08 & 09 (SPLIT LEFT & RIGHT) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <MockupSlot slotNumber={8} type="split-left" imageSrc={mockups?.m08} projectTitle={project.title} base={base} />
                <MockupSlot slotNumber={9} type="split-right" imageSrc={mockups?.m09} projectTitle={project.title} base={base} />
              </div>

              {/* ROW 7: MOCKUPS 10 & 11 (SPLIT LEFT & RIGHT) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <MockupSlot slotNumber={10} type="split-left" imageSrc={mockups?.m10} projectTitle={project.title} base={base} />
                <MockupSlot slotNumber={11} type="split-right" imageSrc={mockups?.m11} projectTitle={project.title} base={base} />
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-black shadow-2xl">
              <img 
                src={`${base}images/${project.image}`}
                srcSet={responsiveImageSrcSet(`${base}images/${project.image}`)}
                sizes="100vw"
                alt={`${project.title} showcase visual`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <section className="px-5 md:px-8 pb-12 sm:pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-3 sm:mb-4">The business</p>
            <h2 className="font-display font-extrabold uppercase tracking-tighter text-2xl sm:text-3xl md:text-4xl leading-[0.95]">Context &amp; challenge</h2>
          </div>
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            <div>
              <h3 className="font-display uppercase tracking-tight text-base sm:text-lg md:text-xl mb-2">The context</h3>
              <p className="font-sans text-sm sm:text-base md:text-lg text-ink/70 leading-relaxed">{project.context}</p>
            </div>
            <div>
              <h3 className="font-display uppercase tracking-tight text-base sm:text-lg md:text-xl mb-2">The challenge</h3>
              <p className="font-sans text-sm sm:text-base md:text-lg text-ink/70 leading-relaxed">{project.challenge}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-12 sm:py-20 md:py-24 bg-neon text-black">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/60 mb-3 sm:mb-4">The response</p>
            <h2 className="font-display font-extrabold uppercase tracking-tighter text-2xl sm:text-3xl md:text-4xl leading-[0.95]">Design with a job to do</h2>
          </div>
          <ul className="lg:col-span-8 divide-y divide-black/20 border-y border-black/20">
            {project.response.map((item, index) => (
              <li key={item} className="grid grid-cols-[2rem_1fr] sm:grid-cols-[3rem_1fr] md:grid-cols-[3.5rem_1fr] gap-3 sm:gap-4 py-4 sm:py-6">
                <span className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl">0{index + 1}</span>
                <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 md:px-8 py-12 sm:py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-3 sm:mb-4">Business value</p>
            <h2 className="font-display font-extrabold uppercase tracking-tighter text-2xl sm:text-3xl md:text-4xl leading-[0.95]">Built to support the next step</h2>
          </div>
          <p className="lg:col-span-8 font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl text-ink/75 leading-relaxed">{project.value}</p>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto border-t border-ink/15 pt-8 sm:pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-2">Have a similar challenge?</p>
            <h2 className="font-display font-extrabold uppercase tracking-tighter text-2xl sm:text-3xl md:text-4xl">Let’s talk about it</h2>
          </div>
          <button onClick={() => onNavigate('contact')} className="rounded-full bg-neon px-6 py-3.5 sm:px-7 sm:py-4 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-black hover:scale-[1.03] transition-transform">Discuss your project ↗</button>
        </div>
      </section>

      <nav aria-label="Case study navigation" className="px-5 md:px-8 pb-16 sm:pb-24 md:pb-28">
        <div className="max-w-[1400px] mx-auto grid sm:grid-cols-2 gap-4">
          <a href={`#/case-study/${previousSlug}`} className="group relative isolate overflow-hidden rounded-xl sm:rounded-2xl border border-ink/15 p-5 sm:p-7 md:p-8 hover:border-neon/60 transition-colors">
            <img src={`${base}images/${previousProject.caseStudyThumbnail}`} alt="" aria-hidden="true" loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 hidden h-full w-full scale-105 object-cover opacity-0 transition duration-400 ease-out md:block md:group-hover:scale-100 md:group-hover:opacity-35" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/80 via-black/60 to-black/75 opacity-0 transition-opacity duration-300 md:block md:group-hover:opacity-100" />
            <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 transition-colors md:group-hover:text-white/70">← Previous project</span>
            <span className="relative z-10 mt-2 sm:mt-3 block font-display font-bold uppercase tracking-tight text-xl sm:text-2xl md:text-3xl group-hover:text-accent-ink md:group-hover:text-neon transition-colors">{previousProject.title}</span>
          </a>
          <a href={`#/case-study/${nextSlug}`} className="group relative isolate overflow-hidden rounded-xl sm:rounded-2xl border border-ink/15 p-5 sm:p-7 md:p-8 text-left sm:text-right hover:border-neon/60 transition-colors">
            <img src={`${base}images/${nextProject.caseStudyThumbnail}`} alt="" aria-hidden="true" loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 hidden h-full w-full scale-105 object-cover opacity-0 transition duration-400 ease-out md:block md:group-hover:scale-100 md:group-hover:opacity-35" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-black/80 via-black/60 to-black/75 opacity-0 transition-opacity duration-300 md:block md:group-hover:opacity-100" />
            <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 transition-colors md:group-hover:text-white/70">Next project →</span>
            <span className="relative z-10 mt-2 sm:mt-3 block font-display font-bold uppercase tracking-tight text-xl sm:text-2xl md:text-3xl group-hover:text-accent-ink md:group-hover:text-neon transition-colors">{nextProject.title}</span>
          </a>
        </div>
      </nav>
    </main>
  );
}
