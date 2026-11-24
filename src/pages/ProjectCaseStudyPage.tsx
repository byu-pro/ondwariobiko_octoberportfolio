import React from 'react';
import { PageRoute } from '../types';
import { responsiveImageSrcSet } from '../utils/images';
import { GlitchText } from '../components/GlitchText';

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
const _ENC_STORE = "eyJwZWxpY2FuLXNvY2lhbCI6eyJudW1iZXIiOiIwMSIsInRpdGxlIjoiUGVsaWNhbiBTb2NpYWwiLCJzdWJ0aXRsZSI6IkEgQ2FyaWJiZWFuIGJhciBhbmQgZ3JpbGwgaW4gU2ltcHNvbiBCYXksIFNpbnQgTWFhcnRlbi4iLCJjYXRlZ29yeSI6IkJyYW5kIGlkZW50aXR5IMK3IFJlc3RhdXJhbnQiLCJsb2NhdGlvbiI6IlNpbXBzb24gQmF5LCBTaW50IE1hYXJ0ZW4iLCJjYXNlU3R1ZHlUaHVtYm5haWwiOiJwZWxpY2Fuc29jaWFsbG9nb19jYXNlc3R1ZHl0aHVtYm5haWwud2VicCIsImltYWdlIjoicGVsaWNhbnNvY2lhbF90aHVtYm5haWxkZXNrdG9wLndlYnAiLCJsaW5rcyI6W1siUGVsaWNhbiBTb2NpYWwgd2Vic2l0ZSIsImh0dHBzOi8vcGVsaWNhbnNvY2lhbHN4bS5jb20vIl0sWyJNYWhvIEdyb3VwIHZlbnVlIHBhZ2UiLCJodHRwczovL21haG93aW5lYW5kZGluZS5jb20vdmVudWVzL3BlbGljYW4tc29jaWFsIl1dLCJjb250ZXh0IjoiUGVsaWNhbiBTb2NpYWwgaXMgYSBiYXIgYW5kIGdyaWxsIGluIFNpbXBzb24gQmF5LCBTaW50IE1hYXJ0ZW4sIHNlcnZpbmcgcmVzb3J0IHZpc2l0b3JzIGFuZCBsb2NhbCBndWVzdHMgaW4gYSBkZXN0aW5hdGlvbiBmdWxsIG9mIGRpbmluZyBjaG9pY2VzLiIsImNoYWxsZW5nZSI6IlRoZSBicmFuZCBuZWVkZWQgdG8gY29tbXVuaWNhdGUgYSB2YXJpZWQsIGZyZXNobHkgcHJlcGFyZWQgbWVudSBhbmQgYSByZWxheGVkIENhcmliYmVhbiBhdG1vc3BoZXJlLCB3aGlsZSBnaXZpbmcgdmlzaXRvcnMgYSBtZW1vcmFibGUgbmFtZSBhbmQgaWRlbnRpdHkgdG8gcmVjb2duaXplLiIsInJlc3BvbnNlIjpbIkNyZWF0ZWQgYSBjb21wbGV0ZSBsb2dvIGFuZCBicmFuZCBpZGVudGl0eSBkaXJlY3Rpb24gYXJvdW5kIHRoZSBQZWxpY2FuIFNvY2lhbCBuYW1lLiIsIkJhbGFuY2VkIGEgcG9saXNoZWQsIHdlbGNvbWluZyByZXN0YXVyYW50IGZlZWwgd2l0aCB0aGUgY2xpZW504oCZcyBib2hvLWNoaWMgQ2FyaWJiZWFuIHNldHRpbmcuIiwiRGVzaWduZWQgdGhlIGlkZW50aXR5IHRvIHdvcmsgYWNyb3NzIGRpZ2l0YWwgdG91Y2hwb2ludHMgYW5kIG9uLXByZW1pc2UgY3VzdG9tZXIgbWF0ZXJpYWxzLiJdLCJ2YWx1ZSI6IkEgZGlzdGluY3RpdmUgaWRlbnRpdHkgZ2l2ZXMgZ3Vlc3RzIGEgY2xlYXJlciBzZW5zZSBvZiB0aGUgZXhwZXJpZW5jZSBiZWZvcmUgdGhleSBhcnJpdmUgYW5kIGhlbHBzIHRoZSByZXN0YXVyYW50IHN0YW5kIGFwYXJ0IGluIGEgYnVzeSByZXNvcnQgZGVzdGluYXRpb24uIn0sImlrb24tdHJhaWxlcnMiOnsibnVtYmVyIjoiMDIiLCJ0aXRsZSI6IklLT04gVHJhaWxlcnMiLCJzdWJ0aXRsZSI6IkEgaGVhdnktZHV0eSB0cmFpbGVyIGRlYWxlciBzZXJ2aW5nIG93bmVyLW9wZXJhdG9ycyBhbmQgYnVzaW5lc3NlcyBpbiBTYW4gQW50b25pbywgVGV4YXMuIiwiY2F0ZWdvcnkiOiJCcmFuZCBpZGVudGl0eSDCtyBJbmR1c3RyaWFsIiwibG9jYXRpb24iOiJTYW4gQW50b25pbywgVGV4YXMsIFVTQSIsImNhc2VTdHVkeVRodW1ibmFpbCI6Imlrb250cmFpbGVyc2xvZ29fY2FzZXN0dWR5dGh1bWJuYWlsLndlYnAiLCJpbWFnZSI6Imlrb250cmFpbGVyc190aHVtYm5haWxsZGVza3RvcC53ZWJwIiwibGlua3MiOltbIklLT04gVHJhaWxlcnMgd2Vic2l0ZSIsImh0dHBzOi8vaWtvbnRyYWlsZXJzLmNvbS8iXV0sImNvbnRleHQiOiJJS09OIFRyYWlsZXJzIHNlbGxzIGhlYXZ5LWR1dHkgdHJhaWxlcnMgaW4gU2FuIEFudG9uaW8sIFRleGFzLCBzZXJ2aW5nIG93bmVyLW9wZXJhdG9ycyBhcyB3ZWxsIGFzIGxhcmdlIGNvcnBvcmF0ZSBidXllcnMgYWNyb3NzIHNldmVyYWwgdHJhaWxlciBjYXRlZ29yaWVzLiIsImNoYWxsZW5nZSI6IlRoZSBidXNpbmVzcyB3YW50ZWQgaXRzIGlkZW50aXR5IHRvIGV4cHJlc3MgdGhlIHN0cmVuZ3RoIGFuZCBoaWdoIHN0YW5kYXJkcyBiZWhpbmQgdGhlIElLT04gbmFtZSwgd2hpbGUgZWFybmluZyBjb25maWRlbmNlIGZyb20gYnV5ZXJzIHdpdGggdmVyeSBkaWZmZXJlbnQgb3BlcmF0aW5nIHNjYWxlcy4iLCJyZXNwb25zZSI6WyJEZXZlbG9wZWQgYSBsb2dvIGFuZCBicmFuZCBpZGVudGl0eSBmb3IgYSBoZWF2eS1kdXR5IHRyYWlsZXIgZGVhbGVyLiIsIlVzZWQgYSBzdHJvbmcsIGFzc3VyZWQgdmlzdWFsIGNoYXJhY3RlciBzdWl0ZWQgdG8gYW4gaW5kdXN0cmlhbCBzYWxlcyBlbnZpcm9ubWVudC4iLCJLZXB0IHRoZSBpZGVudGl0eSBmb2N1c2VkIG9uIHRoZSBJS09OIG5hbWUgYW5kIHRoZSBxdWFsaXR5IG9mIHRoZSBzZXJ2aWNlIGl0IHJlcHJlc2VudHMuIl0sInZhbHVlIjoiQSBjbGVhciwgcHJvZmVzc2lvbmFsIGlkZW50aXR5IGhlbHBzIHRoZSBidXNpbmVzcyBwcmVzZW50IGl0c2VsZiBjb25zaXN0ZW50bHkgdG8gaW5kaXZpZHVhbCBvcGVyYXRvcnMgYW5kIGVudGVycHJpc2UgYnV5ZXJzLCBzdXBwb3J0aW5nIHRydXN0IGF0IHRoZSBzdGFydCBvZiBhIGNvbnNpZGVyZWQgcHVyY2hhc2UuIn0sImlyb24tYWNyZSI6eyJudW1iZXIiOiIwMyIsInRpdGxlIjoiSXJvbiBBY3JlIExhbmQgQ28iLCJzdWJ0aXRsZSI6IkFuIGV4Y2F2YXRpb24gYW5kIGxhbmQgbWFuYWdlbWVudCBjb21wYW55IHNlcnZpbmcgbGFuZG93bmVycyBhbmQgaG9tZW93bmVycy4iLCJjYXRlZ29yeSI6IkJyYW5kIGlkZW50aXR5IMK3IENvbnN0cnVjdGlvbiIsImxvY2F0aW9uIjoiVW5pdGVkIFN0YXRlcyIsImNhc2VTdHVkeVRodW1ibmFpbCI6Imlyb25hY3JlbG9nb19jYXNlc3R1ZHl0aHVtYm5haWwud2VicCIsImltYWdlIjoiaXJvbmFjcmVfdGh1bWJuYWlsZGVza3RvcC53ZWJwIiwibGlua3MiOltbIklyb24gQWNyZSBMYW5kIENvIHdlYnNpdGUiLCJodHRwczovL3d3dy5pcm9uYWNyZWxhbmRjby5jb20vIl1dLCJjb250ZXh0IjoiSXJvbiBBY3JlIExhbmQgQ28gcHJvdmlkZXMgZXhjYXZhdGlvbiBhbmQgbGFuZCBtYW5hZ2VtZW50IGZvciBsYW5kb3duZXJzIGFuZCBob21lb3duZXJzLCB3aXRoIHdvcmsgc3Bhbm5pbmcgbGFuZCwgZXF1aW5lLCBhbmQgY29udHJhY3RvciBzZXR0aW5ncy4iLCJjaGFsbGVuZ2UiOiJUaGUgbG9nbyBuZWVkZWQgdG8gZmVlbCB0b3VnaCBhbmQgdW5jb21wbGljYXRlZCwgcmVwcm9kdWNlIGNsZWFybHkgb24gdHJ1Y2tzLCBtYWNoaW5lcnksIHdvcmt3ZWFyLCBhbmQgaGF0cywgYW5kIGF2b2lkIG5hcnJvd2luZyB0aGUgY29tcGFueSB0byBvbmx5IGEgZmFybSBvciBob3JzZSBhdWRpZW5jZS4iLCJyZXNwb25zZSI6WyJCdWlsdCB0aGUgaWRlbnRpdHkgYXJvdW5kIHRoZSBmdWxsIElyb24gQWNyZSBMYW5kIENvIG5hbWUuIiwiS2VwdCB0aGUgdmlzdWFsIGRpcmVjdGlvbiBzaW1wbGUsIHN0cm9uZywgYW5kIGdyb3VuZGVkIGluIHRoZSBjbGllbnTigJlzIGJsYWNrLWFuZC13aGl0ZSBwcmVmZXJlbmNlLiIsIkRlc2lnbmVkIGZvciBwcmFjdGljYWwgcmVjb2duaXRpb24gYWNyb3NzIHZlaGljbGVzLCBlcXVpcG1lbnQsIGNsb3RoaW5nLCBhbmQgc21hbGwtZm9ybWF0IHVzZXMuIl0sInZhbHVlIjoiQSB2ZXJzYXRpbGUgaWRlbnRpdHkgbWFrZXMgaXQgZWFzaWVyIGZvciBjdXN0b21lcnMgYW5kIHBhcnRuZXJzIHRvIHJlY29nbml6ZSB0aGUgY29tcGFueSB3aGVyZXZlciB0aGUgd29yayBoYXBwZW5zLCBmcm9tIGEgam9iIHNpdGUgdG8gYSBmaXJzdCBjb252ZXJzYXRpb24uIn0sImZyaWVuZHMtb2YtdW5pb252aWxsZSI6eyJudW1iZXIiOiIwNCIsInRpdGxlIjoiRnJpZW5kcyBvZiBVbmlvbnZpbGxlIiwic3VidGl0bGUiOiJBIG5vbnByb2ZpdCBjYXJpbmcgZm9yIHRoZSBoaXN0b3JpYyB2aWxsYWdlIG9mIFVuaW9udmlsbGUsIFBlbm5zeWx2YW5pYSwgaW4gcGFydG5lcnNoaXAgd2l0aCBpdHMgY29tbXVuaXR5LiIsImNhdGVnb3J5IjoiQnJhbmQgaWRlbnRpdHkgwrcgTm9uLXByb2ZpdCIsImxvY2F0aW9uIjoiVW5pb252aWxsZSwgUGVubnN5bHZhbmlhLCBVU0EiLCJjYXNlU3R1ZHlUaHVtYm5haWwiOiJmcmllbmRzb2Z1bmlvbnZpbGxlbG9nb19jYXNlc3R1ZHl0aHVtYm5haWwud2VicCIsImltYWdlIjoiZnJpZW5kc29mdW5pb252aWxsZV9kZXNrdG9wdGh1bWJuYWlsLndlYnAiLCJsaW5rcyI6W1siRnJpZW5kcyBvZiBVbmlvbnZpbGxlIHdlYnNpdGUiLCJodHRwczovL3d3dy5mcmllbmRzb2Z1bmlvbnZpbGxlLm9yZy8iXV0sImNvbnRleHQiOiJGcmllbmRzIG9mIFVuaW9udmlsbGUgaXMgYSBuZXcgbm9uLXByb2ZpdCB3b3JraW5nIHdpdGggcmVzaWRlbnRzLCBsb2NhbCBidXNpbmVzc2VzLCBhbmQgc3Rha2Vob2xkZXJzIHRvIHN0ZXdhcmQgYSBoaXN0b3JpYyB2aWxsYWdlIGFuZCBpdHMgcHVibGljIHNwYWNlcy4iLCJjaGFsbGVuZ2UiOiJBcyBhIG5ldyBvcmdhbml6YXRpb24sIGl0IG5lZWRlZCBhIHJlY29nbml6YWJsZSBpZGVudGl0eSB0aGF0IGNvdWxkIGV4cHJlc3MgaGVyaXRhZ2UsIGNvbm5lY3Rpb24sIHdhbGthYmlsaXR5LCBhbmQgY2FyZSBmb3IgdGhlIHZpbGxhZ2XigJlzIGZ1dHVyZSB3aXRob3V0IGJsZW5kaW5nIGludG8gbG9jYWwgb3JnYW5pemF0aW9ucyBhbHJlYWR5IHVzaW5nIGJsdWUuIiwicmVzcG9uc2UiOlsiQ3JlYXRlZCBhIGxvZ28gZGlyZWN0aW9uIGZvciB0aGUgRnJpZW5kcyBvZiBVbmlvbnZpbGxlIG5hbWUgYW5kIOKAnEVzdC4gMjAyNeKAnSBkZXRhaWwuIiwiRXhwbG9yZWQgYSBtYXR1cmUsIHNvcGhpc3RpY2F0ZWQgdmlzdWFsIHN0eWxlIHVzaW5nIGdyZWVucywgcmVkcywgYW5kIG90aGVyIHN1aXRhYmxlIGNvbG9ycy4iLCJDb25uZWN0ZWQgdGhlIGlkZW50aXR5IHRvIHRoZSB2aWxsYWdl4oCZcyBjcm9zc3JvYWRzLCBoaXN0b3JpYyBjaGFyYWN0ZXIsIGFuZCBjb2xsYWJvcmF0aXZlIG1pc3Npb24uIl0sInZhbHVlIjoiQSBjbGVhciBpZGVudGl0eSBnaXZlcyB0aGUgb3JnYW5pemF0aW9uIGEgY29uc2lzdGVudCB3YXkgdG8gaW50cm9kdWNlIGl0cyBtaXNzaW9uLCBidWlsZCByZWNvZ25pdGlvbiwgYW5kIGJyaW5nIGNvbW11bml0eSBpbml0aWF0aXZlcyB1bmRlciBvbmUgc2hhcmVkIGJhbm5lci4ifSwic291bmQtY3VydmVzIjp7Im51bWJlciI6IjA1IiwidGl0bGUiOiJTb3VuZEN1cnZlcyIsInN1YnRpdGxlIjoiQSBwcmVtaXVtIGVhcnBob25lIGJyYW5kIGZvciBhdWRpbyBlbnRodXNpYXN0cyBhbmQgcGVvcGxlIGV4cGxvcmluZyBoaWdoLWVuZCBzb3VuZC4iLCJjYXRlZ29yeSI6IldlYnNpdGUgZGVzaWduIMK3IENvbnN1bWVyIHRlY2hub2xvZ3kiLCJsb2NhdGlvbiI6IkNsaWVudCBsb2NhdGlvbiBub3Qgc3BlY2lmaWVkIiwiY2FzZVN0dWR5VGh1bWJuYWlsIjoicWJ5c291bmRjdXJ2ZXNsb2dvX2Nhc2VzdHVkeXRodW1ibmFpbC53ZWJwIiwiaW1hZ2UiOiJzb3VuZGN1cnZlc190aHVtYm5haWxkZXNrdG9wLndlYnAiLCJsaW5rcyI6W10sImNvbnRleHQiOiJTb3VuZEN1cnZlcyBzZWxscyBwcmVtaXVtIGVhcnBob25lcyBwcmljZWQgYXQgJDc5OSB0byB0d28gZ3JvdXBzOiBleHBlcmllbmNlZCBhdWRpbyBlbnRodXNpYXN0cyBhbmQgcGVvcGxlIHdobyBoYXZlIG5vdCB5ZXQgdHJpZWQgcHJlbWl1bSBhdWRpby4iLCJjaGFsbGVuZ2UiOiJUaGUgd2Vic2l0ZSBuZWVkZWQgdG8gc2VydmUgYm90aCBhdWRpZW5jZXM6IGdpdmUga25vd2xlZGdlYWJsZSBidXllcnMgdGhlIHByb2R1Y3QgYW5kIHRlY2hub2xvZ3kgZGV0YWlsIHRoZXkgZXhwZWN0LCB3aGlsZSBoZWxwaW5nIG5ld2NvbWVycyB1bmRlcnN0YW5kIHdoeSB0aGUgbGlzdGVuaW5nIGV4cGVyaWVuY2UgbWVyaXRzIHRoZSBpbnZlc3RtZW50LiIsInJlc3BvbnNlIjpbIlBsYW5uZWQgYSBmaXZlLXBhZ2UgZXhwZXJpZW5jZSBjb3ZlcmluZyB0aGUgaG9tZSwgcHJvZHVjdCwgdGVjaG5vbG9neSwgYW5kIHR3byBjYW1wYWlnbiBsYW5kaW5nIHBhZ2VzLiIsIk9yZ2FuaXplZCBuYXZpZ2F0aW9uIGFuZCBwYWdlIGNvbnRlbnQgYXJvdW5kIHByb2R1Y3QgZGlzY292ZXJ5LCBlZHVjYXRpb24sIGFuZCBjbGVhciBuZXh0IHN0ZXBzLiIsIkRlc2lnbmVkIGRlc2t0b3AgYW5kIG1vYmlsZSBsYXlvdXRzIHRvIHN1cHBvcnQgYm90aCBjb21wYXJpc29uLW1pbmRlZCB2aXNpdG9ycyBhbmQgZmlyc3QtdGltZSBwcmVtaXVtIGJ1eWVycy4iXSwidmFsdWUiOiJBIHdlbGwtc3RydWN0dXJlZCBwcm9kdWN0IGV4cGVyaWVuY2UgY2FuIG1ha2UgYSBoaWdoLWNvbnNpZGVyYXRpb24gb2ZmZXIgZWFzaWVyIHRvIGV2YWx1YXRlLCBleHBsYWluIHByb2R1Y3QgdmFsdWUgY2xlYXJseSwgYW5kIGd1aWRlIGludGVyZXN0ZWQgdmlzaXRvcnMgdG93YXJkIGEgcHVyY2hhc2UgZGVjaXNpb24uIn0sIm1vb2RzLWFuZC1uZXJkcyI6eyJudW1iZXIiOiIwNiIsInRpdGxlIjoiTW9vZHMgTiBNZWRzIiwic3VidGl0bGUiOiJBIGRpZ2l0YWwgd2VsbG5lc3MgY29uY2VwdCBmb3IgYW54aWV0eSBzdXBwb3J0LCBtb29kIHRyYWNraW5nLCBhbmQgbWVkaWNhdGlvbiByZXZpZXdzLiIsImNhdGVnb3J5IjoiV2Vic2l0ZSBkZXNpZ24gwrcgRGlnaXRhbCB3ZWxsbmVzcyIsImxvY2F0aW9uIjoiQ2xpZW50IGxvY2F0aW9uIG5vdCBzcGVjaWZpZWQiLCJjYXNlU3R1ZHlUaHVtYm5haWwiOiJtb29kc25tZWRzbGxvZ29fY2FzZXN0dWR5dGh1bWJuYWlsLndlYnAiLCJpbWFnZSI6Im1vb2RubWVkc190aHVtYm5haWxkZXNrdG9wLndlYnAiLCJsaW5rcyI6W10sImNvbnRleHQiOiJNb29kcyBOIE1lZHMgaXMgYSBkaWdpdGFsIHdlbGxuZXNzIGNvbmNlcHQgZm9yIHBlb3BsZSBleHBlcmllbmNpbmcgYW54aWV0eSwgY29tYmluaW5nIGNhbG1pbmcgY29udGVudCB3aXRoIHRvb2xzIGZvciBkYWlseSBtb29kIGxvZ2dpbmcgYW5kIG1lZGljYXRpb24gcmV2aWV3cy4iLCJjaGFsbGVuZ2UiOiJUaGUgZXhwZXJpZW5jZSBuZWVkZWQgdG8gZmVlbCB2aWJyYW50IHlldCBjYWxtIGFuZCBtYWtlIHNldmVyYWwgdGFza3MgZWFzeSB0byB1bmRlcnN0YW5kOiBmaW5kaW5nIHJlbGllZiByZXNvdXJjZXMsIHJlY29yZGluZyBhIGRhaWx5IG1vb2QsIHZpZXdpbmcgcGFzdCBsb2dzLCB3cml0aW5nIG1lZGljYXRpb24gcmV2aWV3cywgYW5kIGNyZWF0aW5nIGFuIGFjY291bnQuIiwicmVzcG9uc2UiOlsiRGVzaWduZWQgYSBjb25zaXN0ZW50IHZpc3VhbCBkaXJlY3Rpb24gYWNyb3NzIGZpdmUgcGFnZXM6IGhvbWUsIGRhaWx5IGxvZywgcmVzdWx0cywgcmV2aWV3cywgYW5kIHNpZ24tdXAuIiwiVXNlZCBhIGNhbG0gdmlzdWFsIGF0bW9zcGhlcmUgaW5mb3JtZWQgYnkgdGhlIGNsaWVudOKAmXMgaW50ZXJlc3QgaW4gbmF0dXJlIGFuZCBKYXBhbmVzZSBnYXJkZW4gcmVmZXJlbmNlcy4iLCJTdHJ1Y3R1cmVkIHRoZSBrZXkgYWN0aW9ucyBhbmQgaW5mb3JtYXRpb24gc28gdXNlcnMgY2FuIHVuZGVyc3RhbmQgd2hhdCBlYWNoIHBhZ2UgaXMgZm9yLiJdLCJ2YWx1ZSI6IkEgdGhvdWdodGZ1bCBpbnRlcmZhY2UgaGVscHMgdGhlIHNlcnZpY2UgY29tbXVuaWNhdGUgaXRzIHB1cnBvc2UgYW5kIG1ha2VzIGl0cyB0b29scyBlYXNpZXIgdG8gbmF2aWdhdGUuIEl0IHN1cHBvcnRzIHRoZSBwcm9kdWN0IGV4cGVyaWVuY2Ugd2l0aG91dCBwcm9taXNpbmcgYSBtZWRpY2FsIG91dGNvbWUuIn0sImFxdWFwZXQta2VueWEiOnsibnVtYmVyIjoiMDciLCJ0aXRsZSI6IkFxdWFwZXQgS2VueWEiLCJzdWJ0aXRsZSI6IkEgcHJlbWllciBwZXQgY2FyZSwgbnV0cml0aW9uLCBhbmQgYXF1YXRpYyBzdXBwbGllciBzZXJ2aW5nIHBldCBvd25lcnMgYWNyb3NzIEtlbnlhIHNpbmNlIDE5ODQuIiwiY2F0ZWdvcnkiOiJCcmFuZCBpZGVudGl0eSDCtyBQZXQgY2FyZSAmIHJldGFpbCIsImxvY2F0aW9uIjoiTmFpcm9iaSwgS2VueWEiLCJjYXNlU3R1ZHlUaHVtYm5haWwiOiJhcXVhcGV0bG9nb19jYXNlc3R1ZHl0aHVtYm5haWwud2VicCIsImltYWdlIjoiYXF1YXBldF9kZXNrdG9wdGh1bWJuYWlsLndlYnAiLCJsaW5rcyI6W1siQXF1YXBldCBLZW55YSB3ZWJzaXRlIiwiaHR0cHM6Ly9hcXVhcGV0LmNvLmtlLyJdXSwiY29udGV4dCI6IkFxdWFwZXQgS2VueWEgaXMgYSBsZWFkaW5nIHBldCBjYXJlLCBjb21wYW5pb24gYW5pbWFsIG51dHJpdGlvbiwgYW5kIGFxdWFyaXVtIHNwZWNpYWxpc3Qgd2l0aCBtdWx0aXBsZSByZXRhaWwgbG9jYXRpb25zIGFjcm9zcyBOYWlyb2JpLCBwcm92aWRpbmcgaGlnaC1xdWFsaXR5IHBldCBmb29kcywgYWNjZXNzb3JpZXMsIGFuZCBhcXVhdGljIHNldHVwcy4iLCJjaGFsbGVuZ2UiOiJUaGUgYnJhbmQgbmVlZGVkIGEgbW9kZXJuLCBhcHByb2FjaGFibGUsIGFuZCBlbmR1cmluZyB2aXN1YWwgaWRlbnRpdHkgdGhhdCBob25vcnMgb3ZlciBmb3VyIGRlY2FkZXMgb2YgdHJ1c3RlZCBoZXJpdGFnZSB3aGlsZSBhcHBlYWxpbmcgdG8gYSBuZXcgZ2VuZXJhdGlvbiBvZiBwZXQgcGFyZW50cyBhbmQgYXF1YXJpdW0gaG9iYnlpc3RzLiIsInJlc3BvbnNlIjpbIkRlc2lnbmVkIGEgY29tcHJlaGVuc2l2ZSBsb2dvIGFuZCBicmFuZCBpZGVudGl0eSBzeXN0ZW0gY2VsZWJyYXRpbmcgcGV0IGNvbXBhbmlvbnNoaXAgYW5kIGFxdWF0aWMgbGlmZS4iLCJEZXZlbG9wZWQgYSB2aWJyYW50LCB3YXJtIGNvbG9yIHBhbGV0dGUgdGhhdCBjb21tYW5kcyBwcmVzZW5jZSBvbiBzdG9yZWZyb250IHNpZ25hZ2UsIHBhY2thZ2luZywgYW5kIGRpZ2l0YWwgcmV0YWlsLiIsIkJ1aWx0IHNjYWxhYmxlIGJyYW5kIGd1aWRlbGluZXMgYW5kIGFzc2V0IHRvdWNocG9pbnRzIGZvciBwaHlzaWNhbCByZXRhaWwgYnJhbmNoZXMgYW5kIG9ubGluZSBlLWNvbW1lcmNlLiJdLCJ2YWx1ZSI6IkEgcmV2aXRhbGl6ZWQgYnJhbmQgaWRlbnRpdHkgcmVpbmZvcmNlcyBBcXVhcGV0J3MgcG9zaXRpb24gYXMgS2VueWHigJlzIHByZW1pZXIgcGV0IGNhcmUgYXV0aG9yaXR5LCBjcmVhdGluZyBzdHJvbmcgZW1vdGlvbmFsIHJlc29uYW5jZSB3aXRoIGN1c3RvbWVycyBhbmQgY29uc2lzdGVuY3kgYWNyb3NzIHJldGFpbCBicmFuY2hlcy4ifSwib2NlYW4tbGluZS1mcmVpZ2h0Ijp7Im51bWJlciI6IjA4IiwidGl0bGUiOiJPY2VhbiBMaW5lIEZyZWlnaHQgRm9yd2FyZGVycyIsInN1YnRpdGxlIjoiQW4gaW50ZWdyYXRlZCBsb2dpc3RpY3MgYW5kIGZyZWlnaHQgZm9yd2FyZGluZyBsZWFkZXIgcHJvdmlkaW5nIHNlYSwgYWlyLCBhbmQgb3ZlcmxhbmQgY2FyZ28gc29sdXRpb25zIGFjcm9zcyBFYXN0IEFmcmljYS4iLCJjYXRlZ29yeSI6IkJyYW5kIGlkZW50aXR5IMK3IExvZ2lzdGljcyAmIGZyZWlnaHQgZm9yd2FyZGluZyIsImxvY2F0aW9uIjoiTmFpcm9iaSAmIE1vbWJhc2EsIEtlbnlhIiwiY2FzZVN0dWR5VGh1bWJuYWlsIjoib2NlYW5saW5lbG9nb19jYXNlc3R1ZHl0aHVtYm5haWwud2VicCIsImltYWdlIjoib2NlYW5saW5lX2Rlc2t0b3B0aHVtYm5haWwud2VicCIsImxpbmtzIjpbWyJPY2VhbiBMaW5lIEZyZWlnaHQgRm9yd2FyZGVycyB3ZWJzaXRlIiwiaHR0cHM6Ly9vY2VhbmxpbmVmcmVpZ2h0LmNvbS8iXV0sImNvbnRleHQiOiJPY2Vhbi1MaW5lIEZyZWlnaHQgRm9yd2FyZGVycyBMaW1pdGVkIGlzIGFuIGFjY3JlZGl0ZWQgbG9naXN0aWNzIHBhcnRuZXIgd2l0aCBvdmVyIHR3byBkZWNhZGVzIG9mIGV4cGVyaWVuY2UsIG1hbmFnaW5nIGNvbXBsZXggY3VzdG9tcyBjbGVhcmFuY2UsIHdhcmVob3VzaW5nLCBhbmQgbXVsdGktbW9kYWwgdHJhbnNwb3J0IHRocm91Z2hvdXQgRWFzdCBBZnJpY2EgYW5kIGdsb2JhbGx5LiIsImNoYWxsZW5nZSI6IlRoZSBsb2dpc3RpY3MgYW5kIGZyZWlnaHQgc2VjdG9yIHJlcXVpcmVzIGFuIGltbWVkaWF0ZSBzZW5zZSBvZiByZWxpYWJpbGl0eSwgc3BlZWQsIGFuZCBpbnN0aXR1dGlvbmFsIHRydXN0LiBUaGUgYnJhbmQgcmVxdWlyZWQgYSBwb3dlcmZ1bCBjb3Jwb3JhdGUgdmlzdWFsIHN5c3RlbSBjYXBhYmxlIG9mIHdvcmtpbmcgYWNyb3NzIGNvbnRhaW5lciBmbGVldHMsIGhlYXZ5IHRyYW5zcG9ydCwgZG9jdW1lbnRhdGlvbiwgYW5kIGRpZ2l0YWwgY2hhbm5lbHMuIiwicmVzcG9uc2UiOlsiQ3JhZnRlZCBhIGJvbGQsIGF1dGhvcml0YXRpdmUgbG9nbyBhbmQgdmlzdWFsIGlkZW50aXR5IGNlbnRlcmVkIG9uIGdsb2JhbCBtb3ZlbWVudCBhbmQgbWFyaXRpbWUgY29ubmVjdGl2aXR5LiIsIkVuZ2luZWVyZWQgYSBoaWdoLWNvbnRyYXN0IGNvcnBvcmF0ZSBwYWxldHRlIHVzaW5nIG1hcml0aW1lIG5hdnksIGNyaXNwIHdoaXRlLCBhbmQgZHluYW1pYyBjcmltc29uIGFjY2VudHMuIiwiRGVzaWduZWQgY29tcHJlaGVuc2l2ZSBhcHBsaWNhdGlvbiBzeXN0ZW1zIGZvciB2ZWhpY2xlIGZsZWV0cywgc2hpcHBpbmcgY29udGFpbmVycywgY29ycG9yYXRlIGNvbW11bmljYXRpb25zLCBhbmQgZGlnaXRhbCBwbGF0Zm9ybXMuIl0sInZhbHVlIjoiQSBjb21tYW5kaW5nIGNvcnBvcmF0ZSBpZGVudGl0eSBwcm9qZWN0cyBpbnRlcm5hdGlvbmFsIGNyZWRpYmlsaXR5IGFuZCBvcGVyYXRpb25hbCByaWdvciwgaGVscGluZyBPY2VhbiBMaW5lIGVzdGFibGlzaCBpbW1lZGlhdGUgY29uZmlkZW5jZSB3aXRoIGVudGVycHJpc2Ugc2hpcHBlcnMsIGN1c3RvbXMgYXV0aG9yaXRpZXMsIGFuZCBnbG9iYWwgZnJlaWdodCBwYXJ0bmVycy4ifSwiZ3JlZW4tZXNzZW50aWFsIjp7Im51bWJlciI6IjA5IiwidGl0bGUiOiJHcmVlbiBFc3NlbnRpYWxzIiwic3VidGl0bGUiOiJBIGhvbWUgc2VydmljZXMgY29tcGFueSBvZmZlcmluZyBsYXduIGZlcnRpbGl6YXRpb24sIHdlZWQgY29udHJvbCwgYW5kIG1vc3F1aXRvIHRyZWF0bWVudHMuIiwiY2F0ZWdvcnkiOiJMb2dvIGRlc2lnbiDCtyBIb21lIHNlcnZpY2VzIiwibG9jYXRpb24iOiJMb2dhbnZpbGxlLCBHZW9yZ2lhLCBVU0EiLCJjYXNlU3R1ZHlUaHVtYm5haWwiOiJncmVlbmVzc2VudGlhbHNsb2dvX2Nhc2VzdHVkeXRodW1ibmFpbC53ZWJwIiwiaW1hZ2UiOiJncmVlbmVzc2VudGlhbF90aHVtYm5haWxkZXNrdG9wLndlYnAiLCJsaW5rcyI6W1siR3JlZW4gRXNzZW50aWFscyB3ZWJzaXRlIiwiaHR0cHM6Ly93d3cuZ3JlZW5lc3NlbnRpYWxzLmluZm8vIl0sWyJHcmVlbiBFc3NlbnRpYWxzIHByb2ZpbGUiLCJodHRwczovL3d3dy5hbGlnbmFibGUuY29tL2xvZ2FudmlsbGUtZ2EvZ3JlZW4tZXNzZW50aWFscy1sYXduLXNlcnZpY2UiXV0sImNvbnRleHQiOiJHcmVlbiBFc3NlbnRpYWxzIG9mZmVycyBsYXduIGZlcnRpbGl6YXRpb24sIHdlZWQgY29udHJvbCwgYW5kIG1vc3F1aXRvIHRyZWF0bWVudHMgdG8gcGVvcGxlIHdobyB3YW50IGEgaGVhbHRoaWVyIGxhd24gYW5kIGEgbW9yZSBjb21mb3J0YWJsZSB5YXJkLiIsImNoYWxsZW5nZSI6IlRoZSBsb2dvIG5lZWRlZCB0byBtYWtlIHR3byByZWxhdGVkIHNlcnZpY2Vz4oCUbGF3biBjYXJlIGFuZCBtb3NxdWl0byBjb250cm9s4oCUY2xlYXIgdG8gaG9tZW93bmVycyBhdCBhIGdsYW5jZS4iLCJyZXNwb25zZSI6WyJEZXZlbG9wZWQgYSBsb2dvIGRpcmVjdGlvbiBmb3IgdGhlIEdyZWVuIEVzc2VudGlhbHMgbmFtZS4iLCJCcm91Z2h0IHRoZSBsYXduIGFuZCBtb3NxdWl0byBzZXJ2aWNlIGN1ZXMgdG9nZXRoZXIgaW4gb25lIHZpc3VhbCBpZGVudGl0eS4iLCJFeHBsb3JlZCBhIGJsdWUtYW5kLWdyZWVuIHBhbGV0dGUgc3VpdGVkIHRvIHRoZSBlbnZpcm9ubWVudGFsIGFuZCBvdXRkb29yIHNlcnZpY2UgY2F0ZWdvcnkuIl0sInZhbHVlIjoiQ2xlYXIgc2VydmljZSBjdWVzIGNhbiBoZWxwIGhvbWVvd25lcnMgcXVpY2tseSB1bmRlcnN0YW5kIHdoYXQgdGhlIGJ1c2luZXNzIG9mZmVycyBhbmQgcmVtZW1iZXIgaXQgd2hlbiB0aGV5IGFyZSByZWFkeSB0byBpbXByb3ZlIHRoZWlyIG91dGRvb3Igc3BhY2UuIn0sImxld2lzLXBhcmsiOnsibnVtYmVyIjoiMTAiLCJ0aXRsZSI6Ikxld2lzIFBhcmsgUGlja2xlYmFsbCIsInN1YnRpdGxlIjoiQSBuZWlnaGJvcmhvb2QgcGlja2xlYmFsbCBncm91cCBicmluZ2luZyBsb2NhbCBwbGF5ZXJzIHRvZ2V0aGVyIGluIFNhY3JhbWVudG8sIENhbGlmb3JuaWEuIiwiY2F0ZWdvcnkiOiJBcHBhcmVsIGRlc2lnbiDCtyBDb21tdW5pdHkiLCJsb2NhdGlvbiI6IlNhY3JhbWVudG8sIENhbGlmb3JuaWEsIFVTQSIsImNhc2VTdHVkeVRodW1ibmFpbCI6Imxld2lzcGFya2xvZ29fY2FzZXN0dWR5dGh1bWJuYWlsLndlYnAiLCJpbWFnZSI6Imxld2lzcGFya190aHVtYm5haWxkZXNrdG9wLndlYnAiLCJsaW5rcyI6W10sImNvbnRleHQiOiJBIGRpdmVyc2UgZ3JvdXAgb2YgYWR1bHRzIHBsYXlzIHBpY2tsZWJhbGwgcmVndWxhcmx5IGF0IExld2lzIFBhcmsgaW4gU2FjcmFtZW50bywgQ2FsaWZvcm5pYSwgYnJpbmdpbmcgbmVpZ2hib3JzIHRvZ2V0aGVyIGZvciBmcmllbmRzaGlwIGFuZCBleGVyY2lzZS4iLCJjaGFsbGVuZ2UiOiJUaGUgc2hpcnQgZ3JhcGhpYyBuZWVkZWQgdG8gYXBwZWFsIGFjcm9zcyBnZW5kZXJzIGFuZCBhZ2VzLCByZWFkIGNsZWFybHkgaW4gZ3JvdXAgcGhvdG9zLCBhbmQgZ2l2ZSBMZXdpcyBQYXJrIGdyZWF0ZXIgcHJvbWluZW5jZSB0aGFuIHRoZSBjaXR5IGxpbmUuIiwicmVzcG9uc2UiOlsiQ3JlYXRlZCBhIHR3by1jb2xvciBkZXNpZ24gZm9yIG5hdnkgc2hpcnRzIHVzaW5nIHdoaXRlIGFuZCBuZW9uIGdyZWVuLiIsIk1hZGUg4oCcTGV3aXMgUGFya+KAnSB0aGUgcHJpbWFyeSBtZXNzYWdlLCB3aXRoIOKAnFNhY3JhbWVudG8sIENhbGlmb3JuaWHigJ0gaW4gYSBzdXBwb3J0aW5nIHJvbGUuIiwiRGVzaWduZWQgdGhlIGdyYXBoaWMgZm9yIGVhc3kgcmVhZGluZyBhbmQgYSBzaGFyZWQgc2Vuc2Ugb2YgZ3JvdXAgaWRlbnRpdHkuIl0sInZhbHVlIjoiQSByZWNvZ25pemFibGUgZ3JvdXAgc2hpcnQgaGVscHMgcGFydGljaXBhbnRzIGZlZWwgY29ubmVjdGVkIGFuZCBtYWtlcyB0aGUgcGFyayBjb21tdW5pdHkgZWFzaWVyIHRvIGlkZW50aWZ5IGluIHBob3RvcyBhbmQgYXQgbG9jYWwgZXZlbnRzLiJ9fQ==";

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
    sketch: 'friendsofunionvillesketch.webp',
    bw: 'friendsblackandwhite.webp',
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

export function ProjectCaseStudyPage({ base, slug, onNavigate }: ProjectCaseStudyPageProps) {
  const project = caseStudies[slug as keyof typeof caseStudies];
  const brandVisuals = brandProjectVisuals[slug];
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

      {/* BRAND EXPLORATION: CONCEPT SKETCHES (FULL-WIDTH) */}
      {brandVisuals?.sketch && (
        <section className="w-full pb-10 sm:pb-16 md:pb-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 mb-4 sm:mb-6">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink">
              Ideation &amp; Exploratory Sketches
            </p>
          </div>
          <div className="w-full overflow-hidden bg-black">
            <img 
              src={`${base}images/${brandVisuals.sketch}`}
              srcSet={responsiveImageSrcSet(`${base}images/${brandVisuals.sketch}`)}
              sizes="100vw"
              alt={`${project.title} concept sketches`}
              loading="lazy"
              decoding="async"
              className="block w-full h-auto object-cover"
            />
          </div>
        </section>
      )}

      {/* BRAND EXPLORATION: BLACK & WHITE IDENTITY MARK (FULL-WIDTH) */}
      {brandVisuals?.bw && (
        <section className="w-full pb-12 sm:pb-20 md:pb-24">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 mb-4 sm:mb-6">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink">
              Mark Development / Black &amp; White Execution
            </p>
          </div>
          <div className="w-full overflow-hidden bg-black">
            <img 
              src={`${base}images/${brandVisuals.bw}`}
              srcSet={responsiveImageSrcSet(`${base}images/${brandVisuals.bw}`)}
              sizes="100vw"
              alt={`${project.title} black and white mark`}
              loading="lazy"
              decoding="async"
              className="block w-full h-auto object-cover"
            />
          </div>
        </section>
      )}

      <section className="px-5 md:px-8 pb-12 sm:pb-20 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6 mb-5 sm:mb-7">
            <div><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-2 sm:mb-3">Project imagery</p><h2 className="font-display font-extrabold uppercase tracking-tighter text-2xl sm:text-3xl md:text-4xl">The work in detail</h2></div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/40">Identity system &amp; visual execution</p>
          </div>
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
